import express from "express";
import { AuthServices } from "../services/auth.services";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Logger from "../../lib/logger";

export class AuthControllers {
  constructor() {}

  async login(req: express.Request, res: express.Response) {
    const secret: any = process.env.JWTSECRET;
    const authServices = AuthServices.getInstance();
    await authServices.getUsername(req.body)
    .then((user) =>{
      if(!user){
        throw "User Authentication failed";
      }
      const pwdcheck = bcrypt.compareSync(req.body.password, user?.password);
      if (pwdcheck) return user;
      else return undefined;
    })
    .then((auth_user) =>{
      if (!auth_user) {
        throw "Pwd Authentication failed";
      }
      let jwtToken = jwt.sign({email: auth_user?.email,id: auth_user.id,},secret,{ expiresIn: "30m",});
      res.status(200).json({token: jwtToken,expiresIn: 1800,id: auth_user.id});
    })
    .catch((err) =>{
      return res.status(401).json({ message: err});
    })
  }
}
