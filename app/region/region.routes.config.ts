import {CommonRoutesConfig,configureRoutes,} from "../common/common.routes.config";
import {RegionControllers } from "./controllers/region.controllers";
import {RegionMiddleware} from "./middleware/region.middleware";
import express from "express";

export class RegionRoutes
  extends CommonRoutesConfig
  implements configureRoutes
{
  constructor(app: express.Application) {
    super(app, "RegionsRoute");
    this.configureRoutes();
  }

  configureRoutes() {
    const regionControllers = new RegionControllers();
    const regionMiddleware = RegionMiddleware.getInstance();

    this.app.get("/api/region", [
        regionControllers.listRegions
    ]);
    this.app.post("/api/region", [
        regionMiddleware.validateRegionPOST,
        regionControllers.createRegion
    ]);
    this.app.put(`/api/region/:regionId`, [
        regionMiddleware.validateRegionExists,
        regionMiddleware.extractRegionId,
        regionControllers.putRegion
    ]);
    this.app.patch(`/api/region/:regionId`, [
        regionMiddleware.validateRegionExists,
        regionMiddleware.extractRegionId,
        regionControllers.patchRegion
    ]);
    this.app.delete(`/api/region/:regionId`, [
      regionMiddleware.validateRegionExists,
      regionControllers.removeRegion,
    ]);
    this.app.get(`/api/region/:regionId`, [
      regionMiddleware.validateRegionExists,
      regionControllers.getRegionById,
    ]);
  }
}
