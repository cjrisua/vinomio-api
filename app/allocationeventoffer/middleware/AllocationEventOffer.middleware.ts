
import express from 'express';
import { AllocationEventQueryAttributes } from '../../allocationevent/types/allocationevent.qparam';
import { CollectionMiddleware } from '../../collection/middleware/collection.middleware';
import { CommonMiddlewareConfig, filterByKey, FilterQueryParamFactory, RECORD_LIMIT } from '../../common/common.middleware.config';
import Logger from '../../lib/logger';
import { AllocationEventOfferSchemaFactory } from '../schema/allocationeventoffer.schema';
import { AllocationEventOfferServices } from '../services/AllocationEventOffer.services';

export class AllocationEventOfferMiddleware  extends CommonMiddlewareConfig{
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
        const collection = await services.list(RECORD_LIMIT,0,filterStatement);
        if (collection && collection.length > 0) {
            next();
        } else {
            res.status(404).send({error: `Allocation not found`});
        }
    }
    async validatePOST(req: express.Request, res: express.Response, next: express.NextFunction){
        Logger.info(req.body)
        const schema = AllocationEventOfferSchemaFactory().CreatePOST;
        await schema.validateAsync(req.body)
        .then(()=>{
            next();
        })
        .catch((error:any) => {
            CollectionMiddleware.processValidationError(error,res);
        });
    }
    async extractAllocationEventOfferId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.AllocationEventOfferId;
        next();
    }
    async minimumAllocationOffer(req: express.Request, res: express.Response, next: express.NextFunction) {
        if(Array.isArray(req.body)){
            req.body
            .filter((offer:any) => !offer.minimum || offer.minimum == 0 )
            .map((offer:any) => {
                Logger.info("minimum is 1")
                offer.minimum = 1})
        }
        next();
    }
}