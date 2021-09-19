import express from 'express';
import {CountryService} from '../services/countries.services';

export class CountriesMiddleware {
    private static instance: CountriesMiddleware;

    static getInstance() {
        if (!CountriesMiddleware.instance) {
            CountriesMiddleware.instance = new CountriesMiddleware();
        }
        return CountriesMiddleware.instance;
    }
    async validateCountryExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const countryService = CountryService.getInstance();
        const county = await countryService.readById(req.params.countryId);
        if (county) {
            next();
        } else {
            res.status(404).send({error: `County ${req.params.countryId} not found`});
        }
    }
    async extractCountryId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.producerId;
        next();
    }
}