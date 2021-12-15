
import { debug } from 'console';
import express from 'express';
import { CommonMiddlewareConfig, filterByKey, FilterQueryParamFactory, MapQParams } from '../../common/common.middleware.config';
import { Filter } from '../../common/interface/filter.interface';
import Logger from '../../lib/logger';
import { WineSchemaFactory } from '../schema/wine.schema';
import { VintageServices } from '../services/vintage.services';
import { VintageQueryAttributes } from '../types/vintage.qparam';
import { VintageQParameterFilter } from '../types/vintage.type';


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
        const factory = new FilterQueryParamFactory();
        const filterConfig = factory.create(VintageQueryAttributes);
        const filterStatement = filterByKey(req,filterConfig)
        //const filter:Filter = VintageQParameterFilter(req)

        //Logger.debug(`validateVintageQueryParamExists: ${filterStatement}`)
        Logger.debug(filterStatement)
        //Logger.debug(Object.keys(filterStatement).length)

        if(Object.keys(filterStatement).length == 0)
            next();
        else{
            const vintage = await vintageServices.list(100,0,filterStatement);
            if (vintage && vintage.length > 0) {
                next();
            } else {
                res.status(404).send({error: `Vintage not found`});
            }
        }
    }
    async validateVintageIsUnique(req: express.Request, res: express.Response, next: express.NextFunction) {
        const vintageServices = VintageServices.getInstance();
        const filter  = { where: {wineId: req.body.wineId, year:req.body.year}}
        const vinatge = await vintageServices.list(1,0,filter);
        if (vinatge && vinatge.length > 0)
            res.status(409).send({error: `Vintage ${req.body.name} exists`});
        else
            next();
    }
}