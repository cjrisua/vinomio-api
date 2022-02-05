import {CommonRoutesConfig,configureRoutes,} from "../common/common.routes.config";
import {RoleControllers } from "./controllers/role.controllers";
import {RoleMiddleware} from "./middleware/role.middleware";
import express from "express";

export class RoleRoutes
  extends CommonRoutesConfig
  implements configureRoutes
{
  constructor(app: express.Application) {
    super(app, "RolesRoute");
    this.configureRoutes();
  }

  configureRoutes() {
    const roleControllers = new RoleControllers();
    const roleMiddleware = RoleMiddleware.getInstance();

    this.app.get("/api/role", [
        roleControllers.listRoles
    ]);
    this.app.post("/api/role", [
        roleControllers.createRole
    ]);
    this.app.put(`/api/role/:roleId`, [
        roleMiddleware.validateRoleExists,
        roleMiddleware.extractRoleId,
        roleControllers.putRole
    ]);
    this.app.patch(`/api/role/:roleId`, [
        roleMiddleware.validateRoleExists,
        roleMiddleware.extractRoleId,
        roleControllers.patchRole
    ]);
    this.app.delete(`/api/role/:roleId`, [
      roleMiddleware.validateRoleExists,
      roleControllers.removeRole,
    ]);
    this.app.get(`/api/role/:roleId`, [
      roleMiddleware.validateRoleExists,
      roleControllers.getRoleById,
    ]);
  }
}
