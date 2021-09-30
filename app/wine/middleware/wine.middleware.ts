
import express from 'express';
import { CommonMiddlewareConfig } from '../../common/common.middleware.config';
import { WineSchemaFactory } from '../schema/wine.schema';
import { WineServices } from '../services/wine.services';

export class WineMiddleware extends CommonMiddlewareConfig {
    private static instance: WineMiddleware;

    static getInstance() {
        if (!WineMiddleware.instance) {
            WineMiddleware.instance = new WineMiddleware();
        }
        return WineMiddleware.instance;
    }
    async validateWinePOST(req: express.Request, res: express.Response, next: express.NextFunction){
        const schema = WineSchemaFactory().CreatePOST;
        await schema.validateAsync(req.body)
        .then(()=>{
            next();
        })
        .catch((error:any) => {
            WineMiddleware.processValidationError(error,res);
        });
    }
    async validateWineExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const wineServices = WineServices.getInstance();
        const wine = await wineServices.readById(req.params.wineId);
        if (wine) {
            next();
        } else {
            res.status(404).send({error: `Wine ${req.params.wineId} not found`});
        }
    }
    async extractWineId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.wineId;
        next();
    }
}