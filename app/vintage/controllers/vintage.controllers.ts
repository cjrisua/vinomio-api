import express from "express";
import { filterByKeyFindAll } from "../../common/common.middleware.config";
import { VintageServices } from "../services/vintage.services";
import { VintageQParameterFilter } from "../types/vintage.type";

export class VintageControllers {

  constructor(){

  }

  async listVintages(req: express.Request, res: express.Response) {
    const vintageServices = VintageServices.getInstance();
    const vintages = await vintageServices.list(100,0,VintageQParameterFilter(req));
    res.status(200).send(vintages);
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
    const vintage = await vintageServices.deleteById(req.params.vintageId);
    res.status(204).send(``);
  }
}
