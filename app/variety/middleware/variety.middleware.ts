
import express from 'express';
import { CommonMiddlewareConfig, filterByKey, FilterQueryParamFactory } from '../../common/common.middleware.config';
import { VarietyServices } from '../services/variety.services';
import { VarietyQueryAttributes } from '../types/variety.qparam';

export class VarietyMiddleware  extends CommonMiddlewareConfig{
    private static instance: VarietyMiddleware;

    static getInstance() {
        if (!VarietyMiddleware.instance) {
            VarietyMiddleware.instance = new VarietyMiddleware();
        }
        return VarietyMiddleware.instance;
    }
    async validateVarietyExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const varietyServices = VarietyServices.getInstance();
        if(isNaN(Number(req.params.varietyId)))
            res.status(422).send({error: `Unprocessable Variety Id: ${req.params.varietyId}`});
        else{
            const variety = await varietyServices.readById(req.params.varietyId);
            if (variety) {
                next();
            } else {
                res.status(404).send({error: `Variety ${req.params.varietalId} not found`});
            }
        }
    }
    async extractVarietyId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.varietyId;
        next();
    }
    async validateVarietyQueryParamExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const services = VarietyServices.getInstance();
        const factory = new FilterQueryParamFactory();
        const filterConfig = factory.create(VarietyQueryAttributes);
        const filterStatement = filterByKey(req,filterConfig)
        
        if(Object.keys(filterStatement).length == 0)
            next();
        else{
            const result = await services.list(100,0,filterStatement);
            if (result && result.length > 0)
                next();
            else
                res.status(404).send({error: `Variety not found`});
        }
    }
}