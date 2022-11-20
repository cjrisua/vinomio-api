import express from "express";
import { AuthServices } from "../services/auth.services";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Logger from "../../lib/logger";
import { UserServices } from "../../user/services/user.services";

export class AuthControllers {
  constructor() {}

  async login(req: express.Request, res: express.Response) {
    const secret: any = process.env.JWTSECRET;
    const authServices = AuthServices.getInstance();
    const userServices = UserServices.getInstance();
    await authServices.getUsername(req.body)
    .then((user) =>{
      if(!user){
        throw "User Authentication failed";
      }
      const pwdcheck = bcrypt.compareSync(req.body.password, user?.password);
      if (pwdcheck) return user;
      else return undefined;
    })
    .then(async (auth_user:any) =>{
      if (!auth_user) {
        throw "Pwd Authentication failed";
      }
      await userServices.readProfileByEmail(auth_user.email)
      .then((profile) =>{
        let jwtToken = jwt.sign(
          {
            email: auth_user.email, 
            id:auth_user.id,
            cellar: profile.cellar_id || undefined,
            handler: profile.handler || undefined,
            firstName: auth_user.firstName,
            lastName: auth_user.lastName
          },secret,{ expiresIn: "30m",});
        res.status(200).json({token: jwtToken,expiresIn: 1800,id: auth_user.id});
      })
      .catch((err) =>{
        return res.status(401).json({ message: err});
      })
    })
  }
}
