
import express from 'express';
import { CommonMiddlewareConfig, filterByKeyFindAll } from '../../common/common.middleware.config';
import { CountryServices } from '../services/country.services';

export class CountryMiddleware extends CommonMiddlewareConfig{
    private static instance: CountryMiddleware;

    static getInstance() {
        if (!CountryMiddleware.instance) {
            CountryMiddleware.instance = new CountryMiddleware();
        }
        return CountryMiddleware.instance;
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
    async validateCountryQueryParamExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const countryServices = CountryServices.getInstance();
        const filterStatement = filterByKeyFindAll(req)
        console.log(filterStatement)
        const country = await countryServices.list(100,0,filterStatement);
        if (country && country.length > 0) {
            next();
        } else {
            res.status(404).send({error: `Country not found`});
        }
    }
}