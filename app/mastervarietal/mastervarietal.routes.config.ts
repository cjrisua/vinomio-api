import {CommonRoutesConfig,configureRoutes,} from "../common/common.routes.config";
import {MasterVarietalControllers } from "./controllers/mastervarietal.controllers";
import {MasterVarietalMiddleware} from "./middleware/mastervarietal.middleware";
import express from "express";

export class MasterVarietyRoutes
  extends CommonRoutesConfig
  implements configureRoutes
{
  constructor(app: express.Application) {
    super(app, "MasterVarietiesRoute");
    this.configureRoutes();
  }

  configureRoutes() {
    const masterVarietyControllers = new MasterVarietalControllers();
    const masterVarietyMiddleware = MasterVarietalMiddleware.getInstance();

    this.app.get("/api/mastervarietal", [
        masterVarietyControllers.listMastervarietals
    ]);
    this.app.post("/api/mastervarietal", [
        masterVarietyMiddleware.validateMasterVarietalPOST,
        masterVarietyControllers.createMastervarietal
    ]);
    this.app.put(`/api/mastervarietal/:masterVarietalId`, [
        masterVarietyMiddleware.validateMasterVarietalExists,
        masterVarietyMiddleware.extractMasterVarietalId,
        masterVarietyControllers.putMastervarietal
    ]);
    this.app.patch(`/api/mastervarietal/:masterVarietalId`, [
        masterVarietyMiddleware.validateMasterVarietalExists,
        masterVarietyMiddleware.extractMasterVarietalId,
        masterVarietyControllers.patchMastervarietal
    ]);
    this.app.delete(`/api/mastervarietal/:masterVarietalId`, [
      masterVarietyMiddleware.validateMasterVarietalExists,
      masterVarietyControllers.removeMastervarietal,
    ]);
    this.app.get(`/api/mastervarietal/:masterVarietalId`, [
      masterVarietyMiddleware.validateMasterVarietalExists,
      masterVarietyControllers.getMastervarietalById,
    ]);
  }
}
