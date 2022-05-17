import express from 'express';
import { MasterVarietalServices } from '../services/mastervarietal.services';
import { MasterVarietalSchemaFactory } from '../schema/mastervarietal.schema';
import { calculatePageInfo, CommonMiddlewareConfig, filterByKey, FilterQueryParamFactory, RECORD_LIMIT } from '../../common/common.middleware.config';
import { IFilter } from '../../common/interface/filter.interface';
import { MasterVarietalQueryAttributes } from '../types/mastervarietal.qparam';
import Logger from '../../lib/logger';

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
    async validateMasterVarietalVarietyCombo(req: express.Request, res: express.Response, next: express.NextFunction) {
        //req.body.id = req.params.masterVarietalId;
        const service = MasterVarietalServices.getInstance();
        const filter : IFilter = { where: {slug: req.params.slug}}
        const response = await service.list(1,0,filter);
        if(response.length != 0){
            const variety = response[0].varieties.filter((i:any) => i.id == req.params.varietyId);
            if(variety.length != 0)
                next();
            else
            res.status(404).send({error: `Variety id ${req.params.varietyId} not found for ${req.params.slug}`});
        }
        else
            res.status(404).send({error: `MasterVarietal ${req.params.slug} not found`});
    }
    async calculatePages(req: express.Request, res: express.Response, next: express.NextFunction){
        const services = MasterVarietalServices.getInstance();
        await services.count()
            .then((count) => calculatePageInfo(count,req))
            .catch((e)=>Logger.error(e))
        next();
    }
    async validateMastervarietalQueryParamExists(req: express.Request, res: express.Response, next: express.NextFunction) {
       
        const services = MasterVarietalServices.getInstance();
        const factory = new FilterQueryParamFactory();
        const filterConfig = factory.create(MasterVarietalQueryAttributes);
        const filterStatement = filterByKey(req,filterConfig)
        if(Object.keys(filterStatement).length == 0)
            next();
        else{
            const result = await services.list(RECORD_LIMIT,0,filterStatement);
            if (result && result.length > 0)
                next();
            else
                res.status(404).send({error: `MasterVarietal not found`});
        }
    }
}