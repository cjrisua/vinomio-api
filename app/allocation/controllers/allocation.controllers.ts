import express from "express";
import { filterByKey, FilterQueryParamFactory, RECORD_LIMIT } from "../../common/common.middleware.config";
import { IFilter } from "../../common/interface/filter.interface";
import Logger from "../../lib/logger";
import { AllocationServices } from "../services/allocation.services";
import { AllocationQueryAttributes } from "../types/allocation.qparam";

export class AllocationControllers {

  constructor(){

  }

  async listAllocationsByUserId(req: express.Request, res: express.Response) {
    const allocationServices = AllocationServices.getInstance();
    let filter:IFilter = req.body.filter
    const allocations = await allocationServices.listByUserId(req.params.userId, RECORD_LIMIT,0,filter);
    res.status(200).send(allocations);
  }
  async listAllocationLastPurchases(req: express.Request, res: express.Response){
    const services = AllocationServices.getInstance();
    const factory = new FilterQueryParamFactory();
    const filterConfig = factory.create(AllocationQueryAttributes);
    const result = await services.listLastPurchases(req.params.cellarId, RECORD_LIMIT, req.body.offset, filterByKey(req,filterConfig));
    res.status(200).send({
        count:+req.body.count,
        pages:+req.body.pages,
        rows:result
      });
  }
  async listAllocations(req: express.Request, res: express.Response) {
    const services = AllocationServices.getInstance();
    const factory = new FilterQueryParamFactory();
    const filterConfig = factory.create(AllocationQueryAttributes);
    await services.list(RECORD_LIMIT, req.body.offset, filterByKey(req,filterConfig))
    .then((result)=>{
      res.status(200).send({
        count:+req.body.count,
        pages:+req.body.pages,
        rows:result
      });
    })
    .catch((exception)=>{
      res.status(404).send({
        count:0,
        pages:0,
        rows:[],
        error:exception
      });
    })
  }

  async getAllocationById(req: express.Request, res: express.Response) {
    const allocationServices = AllocationServices.getInstance();
    const allocation = await allocationServices.readById(req.params.allocationId);
    res.status(200).send(allocation);
  }

  async createAllocation(req: express.Request, res: express.Response) {
    const allocationServices = AllocationServices.getInstance();
    const allocationId = await allocationServices.create(req.body);
    res.status(201).send({id: allocationId});
  }
  
  async patchAllocation(req: express.Request, res: express.Response) {
    const allocationServices = AllocationServices.getInstance();
    const allocation = await allocationServices.patchById(req.body);
    res.status(204).send(``);
  }

  async putAllocation(req: express.Request, res: express.Response) {
    const allocationServices = AllocationServices.getInstance();
    const allocation = await allocationServices.updateById(req.body);
    res.status(204).send(``);
  }

  async removeAllocation(req: express.Request, res: express.Response) {
    const allocationServices = AllocationServices.getInstance();
    const allocation = await allocationServices.deleteById(req.params.allocationId);
    res.status(204).send(``);
  }
}
