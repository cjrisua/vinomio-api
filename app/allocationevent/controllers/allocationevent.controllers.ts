import express from "express";
import { filterByKey, FilterQueryParamFactory } from "../../common/common.middleware.config";
import Logger from "../../lib/logger";
import { AllocationEventServices } from "../services/allocationevent.services";
import { AllocationEventQueryAttributes } from "../types/allocationevent.qparam";

export class AllocationEventControllers {

  constructor(){

  }

  async listAllocationEvents(req: express.Request, res: express.Response) {
    const allocationeventServices = AllocationEventServices.getInstance();
    const allocationevents = await allocationeventServices.list(100,0,req.body.filter);
    res.status(200).send(allocationevents);
  }

  async getAllocationEventById(req: express.Request, res: express.Response) {
    const allocationeventServices = AllocationEventServices.getInstance();
    const allocationevent = await allocationeventServices.readById(req.params.allocationeventId);
    res.status(200).send(allocationevent);
  }

  async getAllocationEventByMerchant(req: express.Request, res: express.Response) {
    const allocationeventServices = AllocationEventServices.getInstance();
    const allocationevent = await allocationeventServices.readByMerchantId(req.params.merchantId);
    Logger.info(allocationevent)
    if(allocationevent[0] != 0 && allocationevent[0].allocationId == null)
      res.status(404).send([]);
    else
      res.status(200).send(allocationevent);
  }

  async createAllocationEvent(req: express.Request, res: express.Response) {
    const allocationeventServices = AllocationEventServices.getInstance();
    const allocationeventId = await allocationeventServices.create(req.body);
    res.status(201).send({id: allocationeventId});
  }
  
  async patchAllocationEvent(req: express.Request, res: express.Response) {
    const allocationeventServices = AllocationEventServices.getInstance();
    const allocationevent = await allocationeventServices.patchById(req.body);
    res.status(204).send(``);
  }

  async putAllocationEvent(req: express.Request, res: express.Response) {
    const allocationeventServices = AllocationEventServices.getInstance();
    const allocationevent = await allocationeventServices.updateById(req.body);
    res.status(204).send(``);
  }

  async removeAllocationEvent(req: express.Request, res: express.Response) {
    const allocationeventServices = AllocationEventServices.getInstance();
    const allocationevent = await allocationeventServices.deleteById(req.params.allocationeventId);
    res.status(204).send(``);
  }
}
