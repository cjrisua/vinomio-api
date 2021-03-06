import express from "express";
import { filterByKey, filterByKeyFindAll, FilterQueryParamFactory, RECORD_LIMIT } from "../../common/common.middleware.config";
import { ProducerServices } from "../services/producer.services";
import { ProducerQueryAttributes } from "../types/producer.qparam";

export class ProducerControllers {

  constructor(){

  }

  async listProducers(req: express.Request, res: express.Response) {
    const producerServices = ProducerServices.getInstance();
    const factory = new FilterQueryParamFactory();
    const filterConfig = factory.create(ProducerQueryAttributes);
    const result = await producerServices.list(RECORD_LIMIT,req.body.offset, filterByKey(req,filterConfig));
    res.status(200).send({
      count:+req.body.count,
      pages:+req.body.pages,
      rows:result
    });
  }

  async getProducerById(req: express.Request, res: express.Response) {
    const producerServices = ProducerServices.getInstance();
    const producer = await producerServices.readById(req.params.producerId);
    res.status(200).send(producer);
  }

  async createProducer(req: express.Request, res: express.Response) {
    const producerServices = ProducerServices.getInstance();
    const producerId = await producerServices.create(req.body);
    res.status(201).send({id: producerId});
  }
  
  async patch(req: express.Request, res: express.Response) {
    let producerServices = ProducerServices.getInstance();
    await producerServices.patchById(req.body);
    res.status(204).send(``);
  }

  async put(req: express.Request, res: express.Response) {
    const producerServices = ProducerServices.getInstance();
    await producerServices.updateById(req.body);
    res.status(204).send(``);
  }

  async removeProducer(req: express.Request, res: express.Response) {
    const producerServices = ProducerServices.getInstance();
    await producerServices.deleteById(req.params.producerId);
    res.status(204).send(``);
  }
}
