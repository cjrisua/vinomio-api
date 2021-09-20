import {CommonRoutesConfig,configureRoutes,} from "../common/common.routes.config";
import {WineControllers } from "./controllers/wine.controllers";
import {WineMiddleware} from "./middleware/wine.middleware";
import express from "express";

export class WineRoutes
  extends CommonRoutesConfig
  implements configureRoutes
{
  constructor(app: express.Application) {
    super(app, "WinesRoute");
    this.configureRoutes();
  }

  configureRoutes() {
    const wineControllers = new WineControllers();
    const wineMiddleware = WineMiddleware.getInstance();

    this.app.get("/api/wine", [
        wineControllers.listWines
    ]);
    this.app.post("/api/wine", [
        wineControllers.createWine
    ]);
    this.app.put(`/api/wine/:wineId`, [
        wineMiddleware.validateWineExists,
        wineMiddleware.extractWineId,
        wineControllers.putWine
    ]);
    this.app.patch(`/api/wine/:wineId`, [
        wineMiddleware.validateWineExists,
        wineMiddleware.extractWineId,
        wineControllers.patchWine
    ]);
    this.app.delete(`/api/wine/:wineId`, [
      wineMiddleware.validateWineExists,
      wineControllers.removeWine,
    ]);
    this.app.get(`/api/wine/:wineId`, [
      wineMiddleware.validateWineExists,
      wineControllers.getWineById,
    ]);
  }
}
