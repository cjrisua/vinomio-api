import express from "express";
import { filterByKey, filterByKeyFindAll, FilterQueryParamFactory, RECORD_LIMIT } from "../../common/common.middleware.config";
import Logger from "../../lib/logger";
import { CollectionServices } from "../services/collection.services";
import { CollectionQueryAttributes } from "../types/collection.qparam";

export class CollectionControllers {
  constructor() {}

  async listCollections(req: express.Request, res: express.Response) {
    const collectionServices = CollectionServices.getInstance();
    const factory = new FilterQueryParamFactory();
    const filterConfig = factory.create(CollectionQueryAttributes);
    const collections = await collectionServices.list(
      RECORD_LIMIT,
      0,
      filterByKey(req, filterConfig)
    );
    res.status(200).send(collections);
  }

  async getCollectionById(req: express.Request, res: express.Response) {
    const collectionServices = CollectionServices.getInstance();
    const collection = await collectionServices.readById(
      req.params.collectionId
    );
    res.status(200).send(collection);
  }

  async createCollection(req: express.Request, res: express.Response) {
    const collectionServices = CollectionServices.getInstance();
    await collectionServices
      .create(req.body)
      .then(resDao => res.status(201).send({ resDao }))
      .catch(error => res.status(422).send({ message: error }));
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
    const collection = await collectionServices.deleteById(
      req.params.collectionId
    );
    res.status(204).send(``);
  }
}
