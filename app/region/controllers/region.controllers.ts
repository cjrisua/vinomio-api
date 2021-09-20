import express from "express";
import { RegionServices } from "../services/region.services";

export class RegionControllers {

  constructor(){

  }

  async listRegions(req: express.Request, res: express.Response) {
    const regionServices = RegionServices.getInstance();
    const regions = await regionServices.list(100,0);
    res.status(200).send(regions);
  }

  async getRegionById(req: express.Request, res: express.Response) {
    const regionServices = RegionServices.getInstance();
    const region = await regionServices.readById(req.params.regionId);
    res.status(200).send(region);
  }

  async createRegion(req: express.Request, res: express.Response) {
    const regionServices = RegionServices.getInstance();
    const regionId = await regionServices.create(req.body);
    res.status(201).send({id: regionId});
  }
  
  async patchRegion(req: express.Request, res: express.Response) {
    const regionServices = RegionServices.getInstance();
    const region = await regionServices.patchById(req.body);
    res.status(204).send(``);
  }

  async putRegion(req: express.Request, res: express.Response) {
    const regionServices = RegionServices.getInstance();
    const region = await regionServices.updateById(req.body);
    res.status(204).send(``);
  }

  async removeRegion(req: express.Request, res: express.Response) {
    const regionServices = RegionServices.getInstance();
    const region = await regionServices.deleteById(req.params.regionId);
    res.status(204).send(``);
  }
}
