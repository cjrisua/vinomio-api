import express from "express";
import { ProducerService } from "../services/producer.services";

export class ProducersController {

  constructor(){

  }

  async listProducers(req: express.Request, res: express.Response) {
    const producerService = ProducerService.getInstance();
    const producers = await producerService.list(100,0);
    res.status(200).send(producers);
  }
  getProducerById(req: express.Request, res: express.Response) {
    res.status(200).send(`Get to Producer ${req.params.producerId}`);
  }
  async createProducer(req: express.Request, res: express.Response) {
    const producerService = ProducerService.getInstance();
    const producerId = await producerService.create(req.body);
    res.status(201).send({id: producerId});
  }
  patch(req: express.Request, res: express.Response) {
    res.status(200).send(`Patch to Producer ${req.params.producerId}`);
  }
  put(req: express.Request, res: express.Response) {
    res.status(200).send(`Put to Producer ${req.params.producerId}`);
  }
  removeProducer(req: express.Request, res: express.Response) {
    res.status(200).send(`Delete to Producer ${req.params.producerId}`);
  }
}
