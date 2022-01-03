import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = <string>req.headers["authorization"];
  const token = authHeader && authHeader.split(' ')[1]
  //console.log("authHeader: "+ authHeader)
  //console.log("token:" + token);
  const secret: any = process.env.JWTSECRET

  
  try {
    const jwtPayload = <any>jwt.verify(token, secret)
    res.locals.jwtPayload = jwtPayload;
    const { userId, username } = jwtPayload;
    console.log(jwtPayload)
    /*const newToken = jwt.sign({ userId, username }, secret, {
      expiresIn: "1h",
    });
    res.setHeader("token", newToken);*/

  } catch (error) {
    console.log(error)
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }
  next();
};
