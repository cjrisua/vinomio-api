import express from 'express';
import { MasterVarietalServices } from '../services/mastervarietal.services';
import { MasterVarietalSchema, MasterVarietalSchemaFactory } from '../schema/mastervarietal.schema';
import Logger from '../../lib/logger';
import { MasterVarietalFactory } from '../../common/models/mastervarietals.model';
import { CommonMiddlewareConfig, filterByKeyFindAll } from '../../common/common.middleware.config';
import { IFilter } from '../../common/interface/filter.interface';
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
    async validateMasterVarietalIsUnique(req: express.Request, res: express.Response, next: express.NextFunction) {
        const masterVarietalServices = MasterVarietalServices.getInstance();
        const filter : IFilter = { where: {slug: CommonMiddlewareConfig.slugify(req.body.name)}}
        const masterVarietal = await masterVarietalServices.list(1,0,filter);
        if (masterVarietal && masterVarietal.length > 0)
            res.status(409).send({error: `Master Varietal ${req.body.name} exists`});
        else
            next();
    }
    async validateMasterVarietalExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const masterVarietalServices = MasterVarietalServices.getInstance();
        if(isNaN(Number(req.params.masterVarietalId)))
            res.status(422).send({error: `Unprocessable MasterVarietal Id: ${req.params.masterVarietalId}`});
        else{
            const masterVarietal = await masterVarietalServices.readById(req.params.masterVarietalId);
            if (masterVarietal) {
                next();
            } else {
                res.status(404).send({error: `MasterVarietal ${req.params.masterVarietalId} not found`});
            }
        }
    }
    async extractMasterVarietalId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.masterVarietalId;
        next();
    }
    async validateMastervarietalQueryParamExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const masterVarietalServices = MasterVarietalServices.getInstance();
        const filterStatement = filterByKeyFindAll(req)
        const masterVarietal = await masterVarietalServices.list(100,0,filterStatement);
        if (masterVarietal && masterVarietal.length > 0) {
            next();
        } else {
            res.status(404).send({error: `MasterVarietal not found`});
        }
    }
}