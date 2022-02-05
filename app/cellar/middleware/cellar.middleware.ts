
import express from 'express';
import { CommonMiddlewareConfig } from '../../common/common.middleware.config';
import { CellarSchemaFactory } from '../schema/cellar.schema';
import { CellarServices } from '../services/cellar.services';

export class CellarMiddleware extends CommonMiddlewareConfig {
    private static instance: CellarMiddleware;

    static getInstance() {
        if (!CellarMiddleware.instance) {
            CellarMiddleware.instance = new CellarMiddleware();
        }
        return CellarMiddleware.instance;
    }
    async validateCellarPOST(req: express.Request, res: express.Response, next: express.NextFunction){
        const schema = CellarSchemaFactory().CreatePOST;
        await schema.validateAsync(req.body)
        .then(()=>{
            next();
        })
        .catch((error:any) => {
            CellarMiddleware.processValidationError(error,res);
        });
    }
    async validateCellarExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const cellarServices = CellarServices.getInstance();
        const cellar = await cellarServices.readById(req.params.cellarId);
        if (cellar) {
            next();
        } else {
            res.status(404).send({error: `Cellar ${req.params.cellarId} not found`});
        }
    }
    async extractCellarId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.cellarId;
        next();
    }
}