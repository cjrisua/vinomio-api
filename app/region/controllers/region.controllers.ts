import express from "express";
import { filterByKey, filterByKeyFindAll, FilterQueryParamFactory, RECORD_LIMIT } from "../../common/common.middleware.config";
import { RegionServices } from "../services/region.services";
import { RegionQueryAttributes } from "../types/region.qparam";

export class RegionControllers {
  
  constructor(){
  }

  async listRegions(req: express.Request, res: express.Response) {
    
    const regionServices = RegionServices.getInstance();
    const factory = new FilterQueryParamFactory();
    const filterConfig = factory.create(RegionQueryAttributes)
    const filterStatement = filterByKey(req,filterConfig)
    
    let regions : any
    if(req.query.includeparent && req.query.includeparent == 'true')
        regions  = await regionServices.customList(RECORD_LIMIT,0,filterStatement);
    else
        regions = await regionServices.list(RECORD_LIMIT,0,filterStatement);
    res.status(200).send({
      count:+req.body.count,
      pages:+req.body.pages,
      rows:regions
    });
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
