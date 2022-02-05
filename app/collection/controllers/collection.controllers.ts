import express from "express";
import { CollectionServices } from "../services/collection.services";

export class CollectionControllers {

  constructor(){

  }

  async listCollections(req: express.Request, res: express.Response) {
    const collectionServices = CollectionServices.getInstance();
    const collections = await collectionServices.list(100,0);
    res.status(200).send(collections);
  }

  async getCollectionById(req: express.Request, res: express.Response) {
    const collectionServices = CollectionServices.getInstance();
    const collection = await collectionServices.readById(req.params.collectionId);
    res.status(200).send(collection);
  }

  async createCollection(req: express.Request, res: express.Response) {
    const collectionServices = CollectionServices.getInstance();
    const collectionId = await collectionServices.create(req.body);
    res.status(201).send({id: collectionId});
  }
  
  async patchCollection(req: express.Request, res: express.Response) {
    const collectionServices = CollectionServices.getInstance();
    const collection = await collectionServices.patchById(req.body);
    res.status(204).send(``);
  }

  async putCollection(req: express.Request, res: express.Response) {
    const collectionServices = CollectionServices.getInstance();
    const collection = await collectionServices.updateById(req.body);
    res.status(204).send(``);
  }

  async removeCollection(req: express.Request, res: express.Response) {
    const collectionServices = CollectionServices.getInstance();
    const collection = await collectionServices.deleteById(req.params.collectionId);
    res.status(204).send(``);
  }
}
