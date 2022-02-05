import {CommonRoutesConfig,configureRoutes,} from "../common/common.routes.config";
import {CollectioneventControllers } from "./controllers/collectionevent.controllers";
import {CollectioneventMiddleware} from "./middleware/collectionevent.middleware";
import express from "express";

export class CollectioneventRoutes
  extends CommonRoutesConfig
  implements configureRoutes
{
  constructor(app: express.Application) {
    super(app, "CollectioneventsRoute");
    this.configureRoutes();
  }

  configureRoutes() {
    const collectioneventControllers = new CollectioneventControllers();
    const collectioneventMiddleware = CollectioneventMiddleware.getInstance();

    this.app.get("/api/collectionevent", [
        collectioneventControllers.listCollectionevents
    ]);
    this.app.post("/api/collectionevent", [
        collectioneventControllers.createCollectionEvent
    ]);
    this.app.put(`/api/collectionevent/:collectioneventId`, [
        collectioneventMiddleware.validateCollectioneventExists,
        collectioneventMiddleware.extractCollectioneventId,
        collectioneventControllers.putCollectionEvent
    ]);
    this.app.patch(`/api/collectionevent/:collectioneventId`, [
        collectioneventMiddleware.validateCollectioneventExists,
        collectioneventMiddleware.extractCollectioneventId,
        collectioneventControllers.patchCollectionEvent
    ]);
    this.app.delete(`/api/collectionevent/:collectioneventId`, [
      collectioneventMiddleware.validateCollectioneventExists,
      collectioneventControllers.removeCollectionEvent,
    ]);
    this.app.get(`/api/collectionevent/:collectioneventId`, [
      collectioneventMiddleware.validateCollectioneventExists,
      collectioneventControllers.getCollectionEventById,
    ]);
  }
}
