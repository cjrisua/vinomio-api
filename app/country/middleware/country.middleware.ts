
import express from 'express';
import { CountryServices } from '../services/country.services';

export class CountryMiddleware {
    private static instance: CountryMiddleware;

    static getInstance() {
        if (!CountryMiddleware.instance) {
            CountryMiddleware.instance = new CountryMiddleware();
        }
        return CountryMiddleware.instance;
    }
    async validateCountryExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const countryServices = CountryServices.getInstance();
        const country = await countryServices.readById(req.params.countryId);
        if (country) {
            next();
        } else {
            res.status(404).send({error: `Country ${req.params.countryId} not found`});
        }
    }
    async extractCountryId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.countryId;
        next();
    }
}