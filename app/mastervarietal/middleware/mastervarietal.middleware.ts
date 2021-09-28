import express from 'express';
import { MasterVarietalServices } from '../services/mastervarietal.services';
import { MasterVarietalSchema, MasterVarietalSchemaFactory } from '../schema/mastervarietal.schema';
import Logger from '../../lib/logger';
import { MasterVarietalFactory } from '../../common/models/mastervarietals.model';
import { CommonMiddlewareConfig } from '../../common/common.middleware.config';
const Joi = require('joi'); 
export class MasterVarietalMiddleware extends CommonMiddlewareConfig {
    private static instance: MasterVarietalMiddleware;

    static getInstance() {
        if (!MasterVarietalMiddleware.instance) {
            MasterVarietalMiddleware.instance = new MasterVarietalMiddleware();
        }
        return MasterVarietalMiddleware.instance;
    }
   
    async validateMasterVarietalPOST(req: express.Request, res: express.Response, next: express.NextFunction){
        const schema = MasterVarietalSchemaFactory().CreatePOST;
        await schema.validateAsync(req.body)
        .then(()=>{
            next();
        })
        .catch((error:any) => {
            MasterVarietalMiddleware.processValidationError(error,res);
        });
    }
    async validateMasterVarietalExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const masterVarietalServices = MasterVarietalServices.getInstance();
        const masterVarietal = await masterVarietalServices.readById(req.params.masterVarietalId);
        if (masterVarietal) {
            next();
        } else {
            res.status(404).send({error: `MasterVarietal ${req.params.masterVarietalId} not found`});
        }
    }
    async extractMasterVarietalId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.masterVarietalId;
        next();
    }
}