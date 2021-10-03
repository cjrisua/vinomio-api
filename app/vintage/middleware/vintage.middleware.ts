
import express from 'express';
import { CommonMiddlewareConfig } from '../../common/common.middleware.config';
import { WineSchemaFactory } from '../schema/wine.schema';
import { VintageServices } from '../services/vintage.services';

export class VintageMiddleware extends CommonMiddlewareConfig {
    private static instance: VintageMiddleware;

    static getInstance() {
        if (!VintageMiddleware.instance) {
            VintageMiddleware.instance = new VintageMiddleware();
        }
        return VintageMiddleware.instance;
    }
    async validateWinePOST(req: express.Request, res: express.Response, next: express.NextFunction){
        const schema = WineSchemaFactory().CreatePOST;
        await schema.validateAsync(req.body)
        .then(()=>{
            next();
        })
        .catch((error:any) => {
            VintageMiddleware.processValidationError(error,res);
        });
    }
    async validateVintageExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const vintageServices = VintageServices.getInstance();
        const vintage = await vintageServices.readById(req.params.vintageId);
        if (vintage) {
            next();
        } else {
            res.status(404).send({error: `Vintage ${req.params.vintageId} not found`});
        }
    }
    async extractVintageId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.vintageId;
        next();
    }
}