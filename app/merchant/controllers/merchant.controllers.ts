import express from "express";
import { filterByKeyFindAll } from "../../common/common.middleware.config";
import { MerchantServices } from "../services/merchant.services";

export class MerchantControllers {

  constructor(){

  }

  async listMerchants(req: express.Request, res: express.Response) {
    const merchantServices = MerchantServices.getInstance();
    const merchants = await merchantServices.list(100,0,filterByKeyFindAll(req));
    res.status(200).send(merchants);
  }

  async getMerchantById(req: express.Request, res: express.Response) {
    const merchantServices = MerchantServices.getInstance();
    const merchant = await merchantServices.readById(req.params.merchantId);
    res.status(200).send(merchant);
  }

  async createMerchant(req: express.Request, res: express.Response) {
    const merchantServices = MerchantServices.getInstance();
    const merchantId = await merchantServices.create(req.body);
    res.status(201).send({id: merchantId});
  }
  
  async patchMerchant(req: express.Request, res: express.Response) {
    const merchantServices = MerchantServices.getInstance();
    const merchant = await merchantServices.patchById(req.body);
    res.status(204).send(``);
  }

  async putMerchant(req: express.Request, res: express.Response) {
    const merchantServices = MerchantServices.getInstance();
    const merchant = await merchantServices.updateById(req.body);
    res.status(204).send(``);
  }

  async removeMerchant(req: express.Request, res: express.Response) {
    const merchantServices = MerchantServices.getInstance();
    const merchant = await merchantServices.deleteById(req.params.merchantId);
    res.status(204).send(``);
  }
}
