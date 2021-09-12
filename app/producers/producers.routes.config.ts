import {
  CommonRoutesConfig,
  configureRoutes,
} from "../common/common.routes.config";
import { ProducersController } from "./controllers/producers.controller";

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

    this.app.get("/producers", [
        producerController.listProducers
    ]);
    this.app.post("/producers", [
        producerController.createProducer
    ]);
    this.app.put(`/producers/:producerId`, [
        producerController.put
    ]);
    this.app.patch(`/producers/:producerId`, [
        producerController.patch
    ]);
    this.app.delete(`/producers/:producerId`, [
      producerController.removeProducer,
    ]);
    this.app.get(`/producers/:producerId`, [
      producerController.getProducerById,
    ]);
  }
}
