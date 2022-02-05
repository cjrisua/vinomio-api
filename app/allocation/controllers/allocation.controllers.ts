import express from "express";
import { AllocationServices } from "../services/allocation.services";

export class AllocationControllers {

  constructor(){

  }

  async listAllocations(req: express.Request, res: express.Response) {
    const allocationServices = AllocationServices.getInstance();
    const allocations = await allocationServices.list(100,0);
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
