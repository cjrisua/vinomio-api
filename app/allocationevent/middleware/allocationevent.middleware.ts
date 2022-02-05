
import express from 'express';
import Logger from '../../lib/logger';
import { MerchantServices } from '../../merchant/services/merchant.services';
import { AllocationEventServices } from '../services/allocationevent.services';

export class AllocationEventMiddleware {
    private static instance: AllocationEventMiddleware;

    static getInstance() {
        if (!AllocationEventMiddleware.instance) {
            AllocationEventMiddleware.instance = new AllocationEventMiddleware();
        }
        return AllocationEventMiddleware.instance;
    }
    async validateAllocationEventExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const allocationeventServices = AllocationEventServices.getInstance();
        const allocationevent = await allocationeventServices.readById(req.params.allocationeventId);
        if (allocationevent) {
            next();
        } else {
            res.status(404).send({error: `AllocationEvent ${req.params.allocationeventId} not found`});
        }
    }
    async validateMerchantHasAllocationEventExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const service = MerchantServices.getInstance();
        const merchant = await service.readById(req.params.merchantId);
        if (merchant) {
            //Logger.info(merchant)
            next();
        }else{
            res.status(404).send({error: `Merchant ${req.params.merchantId} not found`});
        }
        /*
        const allocationeventServices = AllocationEventServices.getInstance();
        const allocationevent = await allocationeventServices.readById(req.params.allocationeventId);
        if (allocationevent) {
            next();
        } else {
            res.status(404).send({error: `AllocationEvent ${req.params.allocationeventId} not found`});
        }*/
    }
    async extractAllocationEventId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.allocationeventId;
        next();
    }
}