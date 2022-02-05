import {CommonRoutesConfig,configureRoutes,} from "../common/common.routes.config";
import {UserControllers } from "./controllers/user.controllers";
import {UserMiddleware} from "./middleware/user.middleware";
import express from "express";
import { body, param } from "express-validator";

export class UserRoutes
  extends CommonRoutesConfig
  implements configureRoutes
{
  constructor(app: express.Application) {
    super(app, "UsersRoute");
    this.configureRoutes();
  }

  configureRoutes() {
    const userControllers = new UserControllers();
    const userMiddleware = UserMiddleware.getInstance();

    this.app.get("/api/user", [
        userControllers.listUsers
    ]);
    this.app.post("/api/user/register", 
      body('email').isEmail(),
      body('password').isStrongPassword(),[
        userMiddleware.validateUserRegister,
        userControllers.createUser
    ]);
    this.app.post("/api/user/profile", 
      body('email').isEmail(),[
        userControllers.getUserProfileByEmail
    ]);
    this.app.put(`/api/user/:userId`, param("userId").isNumeric(), [
        userMiddleware.validateUserExists,
        userMiddleware.extractUserId,
        userControllers.putUser
    ]);
    this.app.patch(`/api/user/:userId`, param("userId").isNumeric(),[
        userMiddleware.validateUserExists,
        userMiddleware.extractUserId,
        userControllers.patchUser
    ]);
    this.app.delete(`/api/user/:userId`, param("userId").isNumeric(),[
      userMiddleware.validateUserExists,
      userControllers.removeUser,
    ]);
    this.app.get(`/api/user/:userId`, 
      param("userId").isNumeric(),[
      userMiddleware.validateUserExists,
      userControllers.getUserById,
    ]);
  }
}
