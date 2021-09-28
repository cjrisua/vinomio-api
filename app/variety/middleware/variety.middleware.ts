
import express from 'express';
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
        const variety = await varietyServices.readById(req.params.varietyId);
        if (variety) {
            next();
        } else {
            res.status(404).send({error: `Variety ${req.params.varietalId} not found`});
        }
    }
    async extractVarietyId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.varietyId;
        next();
    }
}