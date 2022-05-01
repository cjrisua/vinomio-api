import express from "express";
import { filterByKey, FilterQueryParamFactory } from "../../common/common.middleware.config";
import Logger from "../../lib/logger";
import { AllocationEventOfferServices } from "../services/AllocationEventOffer.services";
import { AllocationEventOfferQueryAttributes } from "../types/AllocationEventOffer.qparam";

export class AllocationEventOfferControllers {

  constructor(){

  }

  async listAllocationEventOffers(req: express.Request, res: express.Response) {
    const allocationEventOfferServices = AllocationEventOfferServices.getInstance();
    const factory = new FilterQueryParamFactory();
    const filterConfig = factory.create(AllocationEventOfferQueryAttributes);
    const allocationEventOffers = await allocationEventOfferServices.list(100,0, filterByKey(req,filterConfig));
    res.status(200).send(allocationEventOffers);
  }

  async getAllocationEventOfferById(req: express.Request, res: express.Response) {
    const allocationEventOfferServices = AllocationEventOfferServices.getInstance();
    const allocationEventOffer = await allocationEventOfferServices.readById(req.params.AllocationEventOfferId);
    res.status(200).send(allocationEventOffer);
  }

  async createAllocationEventOffer(req: express.Request, res: express.Response) {
    const allocationEventOfferServices = AllocationEventOfferServices.getInstance();
    Logger.debug(req.body)
    if(Array.isArray(req.body)){
      const allocationEventOfferId = await allocationEventOfferServices.bulkCreate(req.body);
      res.status(201).send(``);
    }else{
      const allocationEventOfferId = await allocationEventOfferServices.create(req.body);
      //res.status(201).send({id: allocationEventOfferId});
      res.status(201).send(``);
    }
   
  }

  async bulkAllocationEventOffer(req: express.Request, res: express.Response) {
    const allocationEventOfferServices = AllocationEventOfferServices.getInstance();
    const allocationEventOfferId = await allocationEventOfferServices.bulkCreate(req.body);
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
