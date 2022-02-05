import {CommonRoutesConfig,configureRoutes,} from "../common/common.routes.config";
import {AllocationControllers } from "./controllers/allocation.controllers";
import {AllocationMiddleware} from "./middleware/allocation.middleware";
import express from "express";

export class AllocationRoutes
  extends CommonRoutesConfig
  implements configureRoutes
{
  constructor(app: express.Application) {
    super(app, "AllocationsRoute");
    this.configureRoutes();
  }

  configureRoutes() {
    const allocationControllers = new AllocationControllers();
    const allocationMiddleware = AllocationMiddleware.getInstance();

    this.app.get("/api/allocation", [
        allocationControllers.listAllocations
    ]);
    this.app.post("/api/allocation", [
        allocationControllers.createAllocation
    ]);
    this.app.put(`/api/allocation/:allocationId`, [
        allocationMiddleware.validateAllocationExists,
        allocationMiddleware.extractAllocationId,
        allocationControllers.putAllocation
    ]);
    this.app.patch(`/api/allocation/:allocationId`, [
        allocationMiddleware.validateAllocationExists,
        allocationMiddleware.extractAllocationId,
        allocationControllers.patchAllocation
    ]);
    this.app.delete(`/api/allocation/:allocationId`, [
      allocationMiddleware.validateAllocationExists,
      allocationControllers.removeAllocation,
    ]);
    this.app.get(`/api/allocation/:allocationId`, [
      allocationMiddleware.validateAllocationExists,
      allocationControllers.getAllocationById,
    ]);
  }
}
