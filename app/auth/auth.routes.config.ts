import {CommonRoutesConfig,configureRoutes,} from "../common/common.routes.config";
import {AuthControllers } from "./controllers/auth.controllers";
import {AuthMiddleware} from "./middleware/auth.middleware";
import express from "express";
import { body, validationResult } from "express-validator";

export class AuthRoutes
  extends CommonRoutesConfig
  implements configureRoutes
{
  constructor(app: express.Application) {
    super(app, "AuthRoutes");
    this.configureRoutes();
  }

  configureRoutes() {
    const authControllers = new AuthControllers();
    const authMiddleware = AuthMiddleware.getInstance();

    this.app.post("/auth/login",[
      authMiddleware.validateAuthSchemaLogin,
      authControllers.login
    ]);
  }
}
