import { CommonRoutesConfig,configureRoutes } from "../common/common.routes.config";
import { ProducerControllers } from "./controllers/producer.controllers";
import { ProducerMiddleware } from "./middleware/producer.middleware";
import express from "express";

export class ProducerRoutes
  extends CommonRoutesConfig
  implements configureRoutes
{
  constructor(app: express.Application) {
    super(app, "ProducersRoute");
    this.configureRoutes();
  }

  configureRoutes() {
    const producerControllers = new ProducerControllers();
    const producerMiddleware = ProducerMiddleware.getInstance();

    this.app.get("/api/producer", [
        producerControllers.listProducers
    ]);
    this.app.post("/api/producer", [
        producerControllers.createProducer
    ]);
    this.app.put(`/api/producer/:producerId`, [
        producerMiddleware.validateProducerExists,
        producerMiddleware.extractProducerId,
        producerControllers.put
    ]);
    this.app.patch(`/api/producer/:producerId`, [
        producerMiddleware.validateProducerExists,
        producerMiddleware.extractProducerId,
        producerControllers.patch
    ]);
    this.app.delete(`/api/producer/:producerId`, [
      producerMiddleware.validateProducerExists,
      producerControllers.removeProducer,
    ]);
    this.app.get(`/api/producer/:producerId`, [
      producerMiddleware.validateProducerExists,
      producerControllers.getProducerById,
    ]);
  }
}
