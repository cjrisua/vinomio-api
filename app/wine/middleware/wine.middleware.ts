
import express from 'express';
import { CommonMiddlewareConfig, filterByKey, filterByKeyFindAll, FilterQueryParamFactory, RECORD_LIMIT } from '../../common/common.middleware.config';
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
    async calculatePages(req: express.Request, res: express.Response, next: express.NextFunction){
        const services = WineServices.getInstance();
        const count = await services.count();
        const page:number = req.query?.page && Number.isInteger(+req.query.page) ? Math.abs(+req.query.page) : 1
        const pages = Math.ceil(count / RECORD_LIMIT);
        const offset =  RECORD_LIMIT * (page - 1);
        req.body.count=count
        req.body.pages=pages
        req.body.offset=offset
        //Logger.info(`page: ${page}, pages:${req.body.pages}, offset: ${req.body.offset}`)
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
            const result = await services.list( RECORD_LIMIT,0,filterStatement);
            if (result && result.length > 0)
                next();
            else
                res.status(404).send({error: `Wine not found`});
        }
    }
    async validateWineIsUnique(req: express.Request, res: express.Response, next: express.NextFunction) {
        const wineServices = WineServices.getInstance();
        const filter : IFilter = { where: {slug: CommonMiddlewareConfig.slugify(req.body.name)}}
        const result = await wineServices.list(1,0,filter);
        if (result && result.length > 0)
            res.status(409).send({error: `Wine ${req.body.name} exists`});
        else
            next();
    }
}