import {CommonRoutesConfig,configureRoutes,} from "../common/common.routes.config";
import {CollectionControllers } from "./controllers/collection.controllers";
import {CollectionMiddleware} from "./middleware/collection.middleware";
import express from "express";

export class CollectionRoutes
  extends CommonRoutesConfig
  implements configureRoutes
{
  constructor(app: express.Application) {
    super(app, "CollectionsRoute");
    this.configureRoutes();
  }

  configureRoutes() {
    const collectionControllers = new CollectionControllers();
    const collectionMiddleware = CollectionMiddleware.getInstance();

    this.app.get("/api/collection", [
        collectionMiddleware.validateCollectionQueryParamExists,
        collectionControllers.listCollections
    ]);
    this.app.post("/api/collection/wine/:wineId", [
      collectionMiddleware.validateCollectionWinePOST,
      collectionControllers.getCollectionByWineId
  ]);
    this.app.post("/api/collection", [
        collectionMiddleware.validateCollectionPOST,
        collectionMiddleware.validateWineVintageExists,
        collectionControllers.createCollection,
    ]);
    this.app.put(`/api/collection/:collectionId`, [
        collectionMiddleware.validateCollectionExists,
        collectionMiddleware.extractCollectionId,
        collectionControllers.putCollection
    ]);
    this.app.patch(`/api/collection/:collectionId`, [
        collectionMiddleware.validateCollectionExists,
        collectionMiddleware.extractCollectionId,
        collectionControllers.patchCollection
    ]);
    this.app.delete(`/api/collection/:collectionId`, [
      collectionMiddleware.validateCollectionExists,
      collectionControllers.removeCollection,
    ]);
    this.app.get(`/api/collection/:collectionId`, [
      collectionMiddleware.validateCollectionExists,
      collectionControllers.getCollectionById,
    ]);
  }
}
