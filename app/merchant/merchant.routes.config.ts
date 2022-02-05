import {CommonRoutesConfig,configureRoutes,} from "../common/common.routes.config";
import {MerchantControllers } from "./controllers/merchant.controllers";
import {MerchantMiddleware} from "./middleware/merchant.middleware";
import express from "express";

export class MerchantRoutes
  extends CommonRoutesConfig
  implements configureRoutes
{
  constructor(app: express.Application) {
    super(app, "MerchantsRoute");
    this.configureRoutes();
  }

  configureRoutes() {
    const merchantControllers = new MerchantControllers();
    const merchantMiddleware = MerchantMiddleware.getInstance();

    this.app.get("/api/merchant", [
        merchantMiddleware.validateMerchantQueryParamExists,
        merchantControllers.listMerchants
    ]);
    this.app.post("/api/merchant", [
        merchantMiddleware.validateMerchantSchema,
        merchantMiddleware.validateUserExists,
        merchantControllers.createMerchant
    ]);
    this.app.put(`/api/merchant/:merchantId`, [
        merchantMiddleware.validateMerchantExists,
        merchantMiddleware.extractMerchantId,
        merchantControllers.putMerchant
    ]);
    this.app.patch(`/api/merchant/:merchantId`, [
        merchantMiddleware.validateMerchantExists,
        merchantMiddleware.extractMerchantId,
        merchantControllers.patchMerchant
    ]);
    this.app.delete(`/api/merchant/:merchantId`, [
      merchantMiddleware.validateMerchantExists,
      merchantControllers.removeMerchant,
    ]);
    this.app.get(`/api/merchant/:merchantId`, [
      merchantMiddleware.validateMerchantExists,
      merchantControllers.getMerchantById,
    ]);
  }
}
