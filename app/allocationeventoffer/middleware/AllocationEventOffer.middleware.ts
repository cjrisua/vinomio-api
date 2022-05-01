
import express from 'express';
import { AllocationEventQueryAttributes } from '../../allocationevent/types/allocationevent.qparam';
import { filterByKey, FilterQueryParamFactory } from '../../common/common.middleware.config';
import { AllocationEventOfferServices } from '../services/AllocationEventOffer.services';

export class AllocationEventOfferMiddleware {
    private static instance: AllocationEventOfferMiddleware;

    static getInstance() {
        if (!AllocationEventOfferMiddleware.instance) {
            AllocationEventOfferMiddleware.instance = new AllocationEventOfferMiddleware();
        }
        return AllocationEventOfferMiddleware.instance;
    }
    async validateAllocationEventOfferExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const allocationEventOfferServices = AllocationEventOfferServices.getInstance();
        const allocationEventOffer = await allocationEventOfferServices.readById(req.params.AllocationEventOfferId);
        if (allocationEventOffer) {
            next();
        } else {
            res.status(404).send({error: `AllocationEventOffer ${req.params.allocationeventofferId} not found`});
        }
    }
    async validateParamExists(req: express.Request, res: express.Response, next: express.NextFunction) {       
        const services = AllocationEventOfferServices.getInstance();
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
    async extractAllocationEventOfferId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.AllocationEventOfferId;
        next();
    }
}