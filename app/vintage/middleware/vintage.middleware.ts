
import express from 'express';
import { any, number } from 'joi';
import { CommonMiddlewareConfig, MapQParams } from '../../common/common.middleware.config';
import { Filter } from '../../common/interface/filter.interface';
import { WineSchemaFactory } from '../schema/wine.schema';
import { VintageServices } from '../services/vintage.services';
import { VintageApiQPrams } from '../types/vintage.type';

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
        if(isNaN(Number(req.params.vintageId)))
            res.status(422).send({error: `Unprocessable Vintage Id: ${req.params.vintageId}`});
        else{
            const vintage = await vintageServices.readById(req.params.vintageId);
            if (vintage) {
                next();
            } else {
                res.status(404).send({error: `Vintage ${req.params.vintageId} not found`});
            }
        }
    }
    async extractVintageId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.vintageId;
        next();
    }
    async validateVintageQueryParamExists(req: express.Request, res: express.Response, next: express.NextFunction) {
    
        const vintageServices = VintageServices.getInstance();
        const queryItems: VintageApiQPrams = {
            id!: Number(req.query.id),
            year!: Number(req.query.year)
        };
        const filter = MapQParams(queryItems);
        const vintage = await vintageServices.list(100,0,filter);
        if (vintage && vintage.length > 0) {
            next();
        } else {
            res.status(404).send({error: `Vintage not found`});
        }
    }
}