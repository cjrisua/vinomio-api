import {CommonRoutesConfig,configureRoutes,} from "../common/common.routes.config";
import { ProducersController } from "./controllers/producers.controller";
import {ProducersMiddleware} from "./middleware/producers.middleware";

import express from "express";

export class ProducersRoutes
  extends CommonRoutesConfig
  implements configureRoutes
{
  constructor(app: express.Application) {
    super(app, "ProducersRoute");
    this.configureRoutes();
  }

  configureRoutes() {
    const producerController = new ProducersController();
    const producersMiddleware = ProducersMiddleware.getInstance();

    this.app.get("/api/producers", [
        producerController.listProducers
    ]);
    this.app.post("/api/producers", [
        producerController.createProducer
    ]);
    this.app.put(`/api/producers/:producerId`, [
        producersMiddleware.validateProducerExists,
        producersMiddleware.extractProducerId,
        producerController.put
    ]);
    this.app.patch(`/api/producers/:producerId`, [
        producersMiddleware.validateProducerExists,
        producersMiddleware.extractProducerId,
        producerController.patch
    ]);
    this.app.delete(`/api/producers/:producerId`, [
      producersMiddleware.validateProducerExists,
      producerController.removeProducer,
    ]);
    this.app.get(`/api/producers/:producerId`, [
      producersMiddleware.validateProducerExists,
      producerController.getProducerById,
    ]);
  }
}
