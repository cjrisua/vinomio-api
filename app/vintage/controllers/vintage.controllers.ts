import express from "express";
import { filterByKey, filterByKeyFindAll, FilterQueryParamFactory, RECORD_LIMIT } from "../../common/common.middleware.config";
import { VintageServices } from "../services/vintage.services";
import { VintageQueryAttributes } from "../types/vintage.qparam";
import { VintageQParameterFilter } from "../types/vintage.type";

export class VintageControllers {

  constructor(){

  }

  async listVintages(req: express.Request, res: express.Response) {

    const vintageServices = VintageServices.getInstance();
    const factory = new FilterQueryParamFactory();
    const filterConfig = factory.create(VintageQueryAttributes)
    const filterStatement = filterByKey(req,filterConfig)
    
    const vintages = await vintageServices.list(RECORD_LIMIT,0,filterStatement);
    res.status(200).send({
      count:+req.body.count,
      pages:+req.body.pages,
      rows:vintages
    });
  }

  async getVintageById(req: express.Request, res: express.Response) {
    const vintageServices = VintageServices.getInstance();
    const vintage = await vintageServices.readById(req.params.vintageId);
    res.status(200).send(vintage);
  }

  async createVintage(req: express.Request, res: express.Response) {
    const vintageServices = VintageServices.getInstance();
    const vintageId = await vintageServices.create(req.body);
    res.status(201).send({id: vintageId});
  }
  
  async patchVintage(req: express.Request, res: express.Response) {
    const vintageServices = VintageServices.getInstance();
    const vintage = await vintageServices.patchById(req.body);
    res.status(204).send(``);
  }

  async putVintage(req: express.Request, res: express.Response) {
    const vintageServices = VintageServices.getInstance();
    const vintage = await vintageServices.updateById(req.body);
    res.status(204).send(``);
  }

  async removeVintage(req: express.Request, res: express.Response) {
    const vintageServices = VintageServices.getInstance();
    await vintageServices.deleteById(req.params.vintageId)
    .then((result) => res.status(204).send(``))
    .catch((error) => res.status(404).send(error));
  }

  async removeVintageFromWine(req: express.Request, res: express.Response) {
    const services = VintageServices.getInstance();
    const masterVarietal = await services.deleteBlendVarietyBySlug(req.params);
    res.status(204).send(``);
  }
}
