import {CommonRoutesConfig,configureRoutes,} from "../common/common.routes.config";
import {VintageControllers } from "./controllers/vintage.controllers";
import {VintageMiddleware} from "./middleware/vintage.middleware";
import express from "express";

export class VintageRoutes
  extends CommonRoutesConfig
  implements configureRoutes
{
  constructor(app: express.Application) {
    super(app, "VintagesRoute");
    this.configureRoutes();
  }

  configureRoutes() {
    const vintageControllers = new VintageControllers();
    const vintageMiddleware = VintageMiddleware.getInstance();

    this.app.get("/api/vintage", [
        vintageMiddleware.validateVintageQueryParamExists,
        vintageMiddleware.calculatePages,
        vintageControllers.listVintages
    ]);
    /*this.app.get("/api/vintage", [
      vintageMiddleware.validateVintageQueryParamExists,
      vintageMiddleware.calculatePages,
      vintageControllers.getVintageByWineName
    ]);*/
    this.app.post("/api/vintage", [
        vintageMiddleware.validateWinePOST,
        vintageMiddleware.validateVintageIsUnique,
        vintageControllers.createVintage
    ]);
    this.app.put(`/api/vintage/:vintageId`, [
        vintageMiddleware.validateVintageExists,
        vintageMiddleware.extractVintageId,
        vintageControllers.putVintage
    ]);
    this.app.patch(`/api/vintage/:vintageId`, [
        vintageMiddleware.validateVintageExists,
        vintageMiddleware.extractVintageId,
        vintageControllers.patchVintage
    ]);
    this.app.delete(`/api/vintage/:vintageId`, [
      vintageMiddleware.validateVintageExists,
      vintageControllers.removeVintage,
    ]);
    this.app.get(`/api/vintage/:vintageId`, [
      vintageMiddleware.validateVintageExists,
      vintageControllers.getVintageById,
    ]);
    //this.app.delete(`/api/vintage/:slug/:vintageId`, [
    //  vintageMiddleware.validateWineVintageCombo,
    //  vintageControllers.removeVintageFromWine,
    //]);
  }
}
