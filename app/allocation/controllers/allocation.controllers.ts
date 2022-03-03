import express from "express";
import { filterByKey, FilterQueryParamFactory } from "../../common/common.middleware.config";
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
    const allocations = await allocationServices.listByUserId(req.params.userId, 100,0,filter);
    res.status(200).send(allocations);
  }
  async listAllocations(req: express.Request, res: express.Response) {
    const allocationServices = AllocationServices.getInstance();
    const filter:IFilter = req.body.filter
    Logger.info(req.body.filter)
    const allocations = await allocationServices.list(100,0,filter);
    res.status(200).send(allocations);
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
