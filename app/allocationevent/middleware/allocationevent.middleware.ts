
import express from 'express';
import { filterByKey, FilterQueryParamFactory } from '../../common/common.middleware.config';
import Logger from '../../lib/logger';
import { MerchantServices } from '../../merchant/services/merchant.services';
import { AllocationEventServices } from '../services/allocationevent.services';
import { AllocationEventQueryAttributes } from '../types/allocationevent.qparam';

export class AllocationEventMiddleware {
    private static instance: AllocationEventMiddleware;

    static getInstance() {
        if (!AllocationEventMiddleware.instance) {
            AllocationEventMiddleware.instance = new AllocationEventMiddleware();
        }
        return AllocationEventMiddleware.instance;
    }
    async validateAllocationEventParamExists(req: express.Request, res: express.Response, next: express.NextFunction) {       
        const services = AllocationEventServices.getInstance();
        const factory = new FilterQueryParamFactory();
        const filterConfig = factory.create(AllocationEventQueryAttributes);
        const filterStatement = filterByKey(req,filterConfig)
        const collection = await services.list(100,0,filterStatement);
        if (collection && collection.length > 0) {
            next();
        } else {
            res.status(404).send({error: `Allocation not found`});
        }
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
    }
    async extractAllocationEventId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.allocationeventId;
        next();
    }
}