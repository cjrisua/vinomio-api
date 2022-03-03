import {CommonRoutesConfig,configureRoutes,} from "../common/common.routes.config";
import {AllocationEventControllers } from "./controllers/allocationevent.controllers";
import {AllocationEventMiddleware} from "./middleware/allocationevent.middleware";
import express from "express";

export class AllocationEventRoutes
  extends CommonRoutesConfig
  implements configureRoutes
{
  constructor(app: express.Application) {
    super(app, "AllocationEventsRoute");
    this.configureRoutes();
  }

  configureRoutes() {
    const allocationeventControllers = new AllocationEventControllers();
    const allocationeventMiddleware = AllocationEventMiddleware.getInstance();

    this.app.get("/api/allocationevent", [
       allocationeventMiddleware.validateAllocationEventParamExists,
        allocationeventControllers.listAllocationEvents
    ]);
    this.app.get("/api/allocationevent/merchant/:merchantId", [
      allocationeventMiddleware.validateMerchantHasAllocationEventExists,
      allocationeventControllers.getAllocationEventByMerchant
    ]);
    this.app.post("/api/allocationevent", [
        allocationeventControllers.createAllocationEvent
    ]);
    this.app.put(`/api/allocationevent/:allocationeventId`, [
        allocationeventMiddleware.validateAllocationEventExists,
        allocationeventMiddleware.extractAllocationEventId,
        allocationeventControllers.putAllocationEvent
    ]);
    this.app.patch(`/api/allocationevent/:allocationeventId`, [
        allocationeventMiddleware.validateAllocationEventExists,
        allocationeventMiddleware.extractAllocationEventId,
        allocationeventControllers.patchAllocationEvent
    ]);
    this.app.delete(`/api/allocationevent/:allocationeventId`, [
      allocationeventMiddleware.validateAllocationEventExists,
      allocationeventControllers.removeAllocationEvent,
    ]);
    this.app.get(`/api/allocationevent/:allocationeventId`, [
      allocationeventMiddleware.validateAllocationEventExists,
      allocationeventControllers.getAllocationEventById,
    ]);
  }
}
