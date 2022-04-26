import express from "express";
import { filterByKey, filterByKeyFindAll, FilterQueryParamFactory } from "../../common/common.middleware.config";
import { WineServices } from "../services/wine.services";
import { WineQueryAttributes } from "../types/wine.qparam";

export class WineControllers {

  constructor(){

  }

  async listWines(req: express.Request, res: express.Response) {
    const services = WineServices.getInstance();
    const factory = new FilterQueryParamFactory();
    const filterConfig = factory.create(WineQueryAttributes);
    const result = await services.list(100,0, filterByKey(req,filterConfig));
    res.status(200).send(result);
  }

  async getWineById(req: express.Request, res: express.Response) {
    const wineServices = WineServices.getInstance();
    const wine = await wineServices.readById(req.params.wineId);
    res.status(200).send(wine);
  }

  async createWine(req: express.Request, res: express.Response) {
    const wineServices = WineServices.getInstance();
    const wineId = await wineServices.create(req.body);
    res.status(201).send({id: wineId});
  }
  
  async patchWine(req: express.Request, res: express.Response) {
    const wineServices = WineServices.getInstance();
    const wine = await wineServices.patchById(req.body);
    res.status(204).send(``);
  }

  async putWine(req: express.Request, res: express.Response) {
    const wineServices = WineServices.getInstance();
    const wine = await wineServices.updateById(req.body);
    res.status(204).send(``);
  }

  async removeWine(req: express.Request, res: express.Response) {
    const wineServices = WineServices.getInstance();
    const wine = await wineServices.deleteById(req.params.wineId);
    res.status(204).send(``);
  }
}
