import express from "express";
import { filterByKeyFindAll } from "../../common/common.middleware.config";
import { MasterVarietalServices } from "../services/mastervarietal.services";

export class MasterVarietalControllers {

  constructor(){

  }

  async listMastervarietals(req: express.Request, res: express.Response) {
    const masterVarietalServices = MasterVarietalServices.getInstance();
    const mastervarietals = await masterVarietalServices.list(100,0, filterByKeyFindAll(req));
    res.status(200).send(mastervarietals);
  }

  async getMastervarietalById(req: express.Request, res: express.Response) {
    const masterVarietalServices = MasterVarietalServices.getInstance();
    const masterVarietal = await masterVarietalServices.readById(req.params.masterVarietalId);
    res.status(200).send(masterVarietal);
  }

  async createMastervarietal(req: express.Request, res: express.Response) {
    const masterVarietalServices = MasterVarietalServices.getInstance();
    const masterVarietalId = await masterVarietalServices.create(req.body);
    res.status(201).send({id: masterVarietalId});
  }
  
  async patchMastervarietal(req: express.Request, res: express.Response) {
    const masterVarietalServices = MasterVarietalServices.getInstance();
    const masterVarietal = await masterVarietalServices.patchById(req.body);
    res.status(204).send(``);
  }

  async putMastervarietal(req: express.Request, res: express.Response) {
    const masterVarietalServices = MasterVarietalServices.getInstance();
    const masterVarietal = await masterVarietalServices.updateById(req.body);
    res.status(204).send(``);
  }

  async removeMastervarietal(req: express.Request, res: express.Response) {
    const masterVarietalServices = MasterVarietalServices.getInstance();
    const masterVarietal = await masterVarietalServices.deleteById(req.params.masterVarietalId);
    res.status(204).send(``);
  }
  async removeVarietyFromMastervarietal(req: express.Request, res: express.Response) {
    const masterVarietalServices = MasterVarietalServices.getInstance();
    const masterVarietal = await masterVarietalServices.deleteBlendVarietyBySlug(req.params);
    res.status(204).send(``);
  }
}
