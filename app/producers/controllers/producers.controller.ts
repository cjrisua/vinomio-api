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

  async getProducerById(req: express.Request, res: express.Response) {
    const producerService = ProducerService.getInstance();
    const producers = await producerService.readById(req.params.producerId);
    res.status(200).send(producers);
  }

  async createProducer(req: express.Request, res: express.Response) {
    const producerService = ProducerService.getInstance();
    const producerId = await producerService.create(req.body);
    res.status(201).send({id: producerId});
  }
  
  async patch(req: express.Request, res: express.Response) {
    let producerService = ProducerService.getInstance();
    const producers = await producerService.patchById(req.body);
    res.status(204).send(``);
  }

  async put(req: express.Request, res: express.Response) {
    const producerService = ProducerService.getInstance();
    const producers = await producerService.updateById(req.body);
    res.status(204).send(``);
  }

  async removeProducer(req: express.Request, res: express.Response) {
    const producerService = ProducerService.getInstance();
    const producers = await producerService.deleteById(req.params.producerId);
    res.status(204).send(``);
  }
}
