import express from "express";
import { filterByKey, filterByKeyFindAll, FilterQueryParamFactory } from "../../common/common.middleware.config";
import { VarietyServices } from "../services/variety.services";
import { VarietyQueryAttributes } from "../types/variety.qparam";

export class VarietyControllers {

  constructor(){

  }

  async listVarieties(req: express.Request, res: express.Response) {
    const services = VarietyServices.getInstance();
    const factory = new FilterQueryParamFactory();
    const filterConfig = factory.create(VarietyQueryAttributes);
    const result = await services.list(100,0, filterByKey(req,filterConfig));
    res.status(200).send(result);
  }

  async getVarietyById(req: express.Request, res: express.Response) {
    const varietyServices = VarietyServices.getInstance();
    const variety = await varietyServices.readById(req.params.varietyId);
    res.status(200).send(variety);
  }

  async createVariety(req: express.Request, res: express.Response) {
    const varietyServices = VarietyServices.getInstance();
    const varietyId = await varietyServices.create(req.body);
    res.status(201).send({id: varietyId});
  }
  
  async patchVariety(req: express.Request, res: express.Response) {
    const varietyServices = VarietyServices.getInstance();
    await varietyServices.patchById(req.body);
    res.status(204).send(``);
  }

  async putVariety(req: express.Request, res: express.Response) {
    const varietyServices = VarietyServices.getInstance();
    await varietyServices.updateById(req.body);
    res.status(204).send(``);
  }

  async removeVariety(req: express.Request, res: express.Response) {
    const varietyServices = VarietyServices.getInstance();
    await varietyServices.deleteById(req.params.varietyId);
    res.status(204).send(``);
  }
}
