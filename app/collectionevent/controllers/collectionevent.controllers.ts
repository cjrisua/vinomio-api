import express from "express";
import { CollectioneventServices } from "../services/collectionevent.services";

export class CollectioneventControllers {

  constructor(){

  }

  async listCollectionevents(req: express.Request, res: express.Response) {
    const collectioneventServices = CollectioneventServices.getInstance();
    const collectionevents = await collectioneventServices.list(100,0);
    res.status(200).send(collectionevents);
  }

  async getCollectionEventById(req: express.Request, res: express.Response) {
    const collectioneventServices = CollectioneventServices.getInstance();
    const collectionevent = await collectioneventServices.readById(req.params.collectioneventId);
    res.status(200).send(collectionevent);
  }

  async createCollectionEvent(req: express.Request, res: express.Response) {
    const collectioneventServices = CollectioneventServices.getInstance();
    const collectioneventId = await collectioneventServices.create(req.body);
    res.status(201).send({id: collectioneventId});
  }
  
  async patchCollectionEvent(req: express.Request, res: express.Response) {
    const collectioneventServices = CollectioneventServices.getInstance();
    const collectionevent = await collectioneventServices.patchById(req.body);
    res.status(204).send(``);
  }

  async putCollectionEvent(req: express.Request, res: express.Response) {
    const collectioneventServices = CollectioneventServices.getInstance();
    const collectionevent = await collectioneventServices.updateById(req.body);
    res.status(204).send(``);
  }

  async removeCollectionEvent(req: express.Request, res: express.Response) {
    const collectioneventServices = CollectioneventServices.getInstance();
    const collectionevent = await collectioneventServices.deleteById(req.params.collectioneventId);
    res.status(204).send(``);
  }
}
