import {CommonRoutesConfig,configureRoutes,} from "../common/common.routes.config";
import {CellarControllers } from "./controllers/cellar.controllers";
import {CellarMiddleware} from "./middleware/cellar.middleware";
import express from "express";

export class CellarRoutes
  extends CommonRoutesConfig
  implements configureRoutes
{
  constructor(app: express.Application) {
    super(app, "CellarsRoute");
    this.configureRoutes();
  }

  configureRoutes() {
    const cellarControllers = new CellarControllers();
    const cellarMiddleware = CellarMiddleware.getInstance();

    this.app.get("/api/cellar", [
        cellarControllers.listCellars
    ]);
    this.app.post("/api/cellar", [
        cellarMiddleware.validateCellarPOST,
        cellarControllers.createCellar
    ]);
    this.app.put(`/api/cellar/:cellarId`, [
        cellarMiddleware.validateCellarExists,
        cellarMiddleware.extractCellarId,
        cellarControllers.putCellar
    ]);
    this.app.patch(`/api/cellar/:cellarId`, [
        cellarMiddleware.validateCellarExists,
        cellarMiddleware.extractCellarId,
        cellarControllers.patchCellar
    ]);
    this.app.delete(`/api/cellar/:cellarId`, [
      cellarMiddleware.validateCellarExists,
      cellarControllers.removeCellar,
    ]);
    this.app.get(`/api/cellar/:cellarId`, [
      cellarMiddleware.validateCellarExists,
      cellarControllers.getCellarById,
    ]);
  }
}
