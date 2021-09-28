import {CommonRoutesConfig,configureRoutes,} from "../common/common.routes.config";
import {VarietyControllers } from "./controllers/variety.controllers";
import {VarietyMiddleware} from "./middleware/variety.middleware";
import express from "express";

export class VarietalRoutes
  extends CommonRoutesConfig
  implements configureRoutes
{
  constructor(app: express.Application) {
    super(app, "VarietalsRoute");
    this.configureRoutes();
  }

  configureRoutes() {
    const varietalControllers = new VarietyControllers();
    const varietalMiddleware = VarietyMiddleware.getInstance();

    this.app.get("/api/variety", [
        varietalControllers.listVarieties
    ]);
    this.app.post("/api/variety", [
        varietalControllers.createVariety
    ]);
    this.app.put(`/api/variety/:varietyId`, [
        varietalMiddleware.validateVarietyExists,
        varietalMiddleware.extractVarietyId,
        varietalControllers.putVariety
    ]);
    this.app.patch(`/api/variety/:varietyId`, [
        varietalMiddleware.validateVarietyExists,
        varietalMiddleware.extractVarietyId,
        varietalControllers.patchVariety
    ]);
    this.app.delete(`/api/variety/:varietyId`, [
      varietalMiddleware.validateVarietyExists,
      varietalControllers.removeVariety,
    ]);
    this.app.get(`/api/variety/:varietyId`, [
      varietalMiddleware.validateVarietyExists,
      varietalControllers.getVarietyById,
    ]);
  }
}
