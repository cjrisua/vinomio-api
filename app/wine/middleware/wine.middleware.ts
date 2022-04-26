
import express from 'express';
import { CommonMiddlewareConfig, filterByKey, filterByKeyFindAll, FilterQueryParamFactory } from '../../common/common.middleware.config';
import { IFilter } from '../../common/interface/filter.interface';
import Logger from '../../lib/logger';
import { WineSchemaFactory } from '../schema/wine.schema';
import { WineServices } from '../services/wine.services';
import { WineQueryAttributes } from '../types/wine.qparam';

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
        if(isNaN(Number(req.params.wineId)))
            res.status(422).send({error: `Unprocessable Wine Id: ${req.params.wineId}`});
        else{
            const wine = await wineServices.readById(req.params.wineId);
            if (wine) {
                next();
            } else {
                res.status(404).send({error: `Wine ${req.params.wineId} not found`});
            }
        }
    }
    async extractWineId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.wineId;
        next();
    }
    async validateWineQueryParamExists(req: express.Request, res: express.Response, next: express.NextFunction) {

        const services = WineServices.getInstance();
        const factory = new FilterQueryParamFactory();
        const filterConfig = factory.create(WineQueryAttributes);
        const filterStatement = filterByKey(req,filterConfig)

        if(Object.keys(filterStatement).length == 0)
            next();
        else{
            const result = await services.list(100,0,filterStatement);
            if (result && result.length > 0)
                next();
            else
                res.status(404).send({error: `Wine not found`});
        }
    }
    async validateWineIsUnique(req: express.Request, res: express.Response, next: express.NextFunction) {
        const wineServices = WineServices.getInstance();
        const filter : IFilter = { where: {slug: CommonMiddlewareConfig.slugify(req.body.name)}}
        const producer = await wineServices.list(1,0,filter);
        if (producer && producer.length > 0)
            res.status(409).send({error: `Wine ${req.body.name} exists`});
        else
            next();
    }
}