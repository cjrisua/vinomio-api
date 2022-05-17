
import express from 'express';
import { calculatePageInfo, CommonMiddlewareConfig, filterByKey, FilterQueryParamFactory, RECORD_LIMIT } from '../../common/common.middleware.config';
import { IFilter } from '../../common/interface/filter.interface';
import { CountrySchemaFactory } from '../schema/country.schema';
import { CountryServices } from '../services/country.services';
import { CountryQueryAttributes } from '../types/country.qparam';
import Logger from '../../lib/logger';

export class CountryMiddleware extends CommonMiddlewareConfig{
    private static instance: CountryMiddleware;

    static getInstance() {
        if (!CountryMiddleware.instance) {
            CountryMiddleware.instance = new CountryMiddleware();
        }
        return CountryMiddleware.instance;
    }
    async validateCountryIsUnique(req: express.Request, res: express.Response, next: express.NextFunction) {
        const countryServices = CountryServices.getInstance();
        const filter : IFilter = { where: {slug: CountryMiddleware.slugify(req.body.name)}}
        const country = await countryServices.list(1,0,filter);
        if (country && country.length > 0)
            res.status(409).send({error: `Country ${req.body.name} exists`});
        else
            next();
    }
    async validateCountryPOST(req: express.Request, res: express.Response, next: express.NextFunction){
        const schema = CountrySchemaFactory().CreatePOST;
        await schema.validateAsync(req.body)
        .then(()=>{
            next();
        })
        .catch((error:any) => {
            CountryMiddleware.processValidationError(error,res);
        });
    }
    async validateCountryExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const countryServices = CountryServices.getInstance();
        if(isNaN(Number(req.params.countryId)))
            res.status(422).send({error: `Unprocessable Country Id: ${req.params.countryId}`});
        else{
            const country = await countryServices.readById(req.params.countryId);
            if (country) {
                next();
            } else {
                res.status(404).send({error: `Country ${req.params.countryId} not found`});
            }
        }
    }
    async extractCountryId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.countryId;
        next();
    }
    async calculatePages(req: express.Request, res: express.Response, next: express.NextFunction){
        const services = CountryServices.getInstance();
        await services.count()
            .then((count) => calculatePageInfo(count,req))
            .catch((e)=>Logger.error(e))
        next();
    }
    async validateCountryQueryParamExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const services = CountryServices.getInstance();
        const factory = new FilterQueryParamFactory();
        const filterConfig = factory.create(CountryQueryAttributes);
        const filterStatement = filterByKey(req,filterConfig)
        
        if(Object.keys(filterStatement).length == 0)
            next();
        else{
            const result = await services.list(RECORD_LIMIT,0,filterStatement);
            if (result && result.length > 0)
                next();
            else
                res.status(404).send({error: `Country not found`});
        }
    }
}