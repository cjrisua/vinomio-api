
import express from 'express';
import { AllocationEventServices } from '../../allocationevent/services/allocationevent.services';
import { CommonMiddlewareConfig } from '../../common/common.middleware.config';
import Logger from '../../lib/logger';
import { CollectionSchemaFactory } from '../schema/collection.schema';
import { CollectionServices } from '../services/collection.services';

export class CollectionMiddleware extends CommonMiddlewareConfig{
    private static instance: CollectionMiddleware;

    static getInstance() {
        if (!CollectionMiddleware.instance) {
            CollectionMiddleware.instance = new CollectionMiddleware();
        }
        return CollectionMiddleware.instance;
    }
    async validateCollectionPOST(req: express.Request, res: express.Response, next: express.NextFunction){
        const schema = CollectionSchemaFactory().CreatePOST;
        await schema.validateAsync(req.body)
        .then(()=>{
            next();
        })
        .catch((error:any) => {
            CollectionMiddleware.processValidationError(error,res);
        });
    }
    async validateCollectionExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const collectionServices = CollectionServices.getInstance();
        const collection = await collectionServices.readById(req.params.collectionId);
        if (collection) {
            next();
        } else {
            res.status(404).send({error: `Collection ${req.params.collectionId} not found`});
        }
    }
    async validateAllocationExist(req: express.Request, res: express.Response, next: express.NextFunction) {
        //Logger.info(req.body[0].merchant);
        if( req.body[0].merchant?.allocationEvent?.name && 
            req.body[0].merchant?.allocationEvent?.allocationId &&
            !req.body[0].merchant?.allocationEvent?.eventId){
            //Logger.info("Add Event")
            const allocationEvent = AllocationEventServices.getInstance();
            const eventId = await allocationEvent.create({
                name:req.body[0].merchant?.allocationEvent?.name, 
                allocationId: req.body[0].merchant?.allocationEvent?.allocationId})
            //Logger.info(eventId)
            //req.body.allocationEventId = eventId;
            //Array(req.body).forEach(x => )
            req.body.forEach((x: any)  => x.allocationEventId = eventId);
        }
        next();
    }
    async extractCollectionId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.collectionId;
        next();
    }
}