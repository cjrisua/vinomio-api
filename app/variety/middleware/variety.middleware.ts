
import express from 'express';
import { filterByKeyFindAll } from '../../common/common.middleware.config';
import { VarietyServices } from '../services/variety.services';

export class VarietyMiddleware {
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
        const varietyServices = VarietyServices.getInstance();
        const filterStatement = filterByKeyFindAll(req)
        const variety = await varietyServices.list(100,0,filterStatement);
        if (variety && variety.length > 0) {
            next();
        } else {
            res.status(404).send({error: `Variety not found`});
        }
    }
}