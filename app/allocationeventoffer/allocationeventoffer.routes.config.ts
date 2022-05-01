import {CommonRoutesConfig,configureRoutes,} from "../common/common.routes.config";
import {AllocationEventOfferControllers } from "./controllers/allocationeventoffer.controllers";
import {AllocationEventOfferMiddleware} from "./middleware/allocationeventoffer.middleware";
import express from "express";

export class AllocationEventOfferRoutes
  extends CommonRoutesConfig
  implements configureRoutes
{
  constructor(app: express.Application) {
    super(app, "AllocationEventOffersRoute");
    this.configureRoutes();
  }

  configureRoutes() {
    const allocationEventOfferControllers = new AllocationEventOfferControllers();
    const allocationEventOfferMiddleware = AllocationEventOfferMiddleware.getInstance();

    this.app.get("/api/AllocationEventOffer", [
        allocationEventOfferMiddleware.validateParamExists,
        allocationEventOfferControllers.listAllocationEventOffers
    ]);
    this.app.post("/api/AllocationEventOffer", [
        allocationEventOfferControllers.createAllocationEventOffer
    ]);
    this.app.put(`/api/AllocationEventOffer/:AllocationEventOfferId`, [
        allocationEventOfferMiddleware.validateAllocationEventOfferExists,
        allocationEventOfferMiddleware.extractAllocationEventOfferId,
        allocationEventOfferControllers.putAllocationEventOffer
    ]);
    this.app.patch(`/api/AllocationEventOffer/:AllocationEventOfferId`, [
        allocationEventOfferMiddleware.validateAllocationEventOfferExists,
        allocationEventOfferMiddleware.extractAllocationEventOfferId,
        allocationEventOfferControllers.patchAllocationEventOffer
    ]);
    this.app.delete(`/api/AllocationEventOffer/:AllocationEventOfferId`, [
      allocationEventOfferMiddleware.validateAllocationEventOfferExists,
      allocationEventOfferControllers.removeAllocationEventOffer,
    ]);
    this.app.get(`/api/AllocationEventOffer/:AllocationEventOfferId`, [
      allocationEventOfferMiddleware.validateAllocationEventOfferExists,
      allocationEventOfferControllers.getAllocationEventOfferById,
    ]);
  }
}
