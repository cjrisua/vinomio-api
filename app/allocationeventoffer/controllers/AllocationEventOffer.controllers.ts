import express from "express";
import { AllocationEventOfferServices } from "../services/AllocationEventOffer.services";

export class AllocationEventOfferControllers {

  constructor(){

  }

  async listAllocationEventOffers(req: express.Request, res: express.Response) {
    const allocationEventOfferServices = AllocationEventOfferServices.getInstance();
    const allocationEventOffers = await allocationEventOfferServices.list(100,0);
    res.status(200).send(allocationEventOffers);
  }

  async getAllocationEventOfferById(req: express.Request, res: express.Response) {
    const allocationEventOfferServices = AllocationEventOfferServices.getInstance();
    const allocationEventOffer = await allocationEventOfferServices.readById(req.params.AllocationEventOfferId);
    res.status(200).send(allocationEventOffer);
  }

  async createAllocationEventOffer(req: express.Request, res: express.Response) {
    const allocationEventOfferServices = AllocationEventOfferServices.getInstance();
    const allocationEventOfferId = await allocationEventOfferServices.create(req.body);
    res.status(201).send({id: allocationEventOfferId});
  }
  
  async patchAllocationEventOffer(req: express.Request, res: express.Response) {
    const allocationEventOfferServices = AllocationEventOfferServices.getInstance();
    const allocationEventOffer = await allocationEventOfferServices.patchById(req.body);
    res.status(204).send(``);
  }

  async putAllocationEventOffer(req: express.Request, res: express.Response) {
    const allocationEventOfferServices = AllocationEventOfferServices.getInstance();
    const allocationEventOffer = await allocationEventOfferServices.updateById(req.body);
    res.status(204).send(``);
  }

  async removeAllocationEventOffer(req: express.Request, res: express.Response) {
    const allocationEventOfferServices = AllocationEventOfferServices.getInstance();
    const allocationEventOffer = await allocationEventOfferServices.deleteById(req.params.AllocationEventOfferId);
    res.status(204).send(``);
  }
}
