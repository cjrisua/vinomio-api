
import express from 'express';
import { calculatePageInfo, CommonMiddlewareConfig, filterByKey, FilterQueryParamFactory, RECORD_LIMIT } from '../../common/common.middleware.config';
import Logger from '../../lib/logger';
import { PeopleSchemaFactory } from '../schema/people.schema';
import { PeopleServices } from '../services/people.services';
import { PeopleQueryAttributes } from '../types/people.qparam';

export class PeopleMiddleware extends CommonMiddlewareConfig{
    private static instance: PeopleMiddleware;

    static getInstance() {
        if (!PeopleMiddleware.instance) {
            PeopleMiddleware.instance = new PeopleMiddleware();
        }
        return PeopleMiddleware.instance;
    }
    async validateAddPeople(req: express.Request, res: express.Response, next: express.NextFunction){
        const schema = PeopleSchemaFactory().AddPeople;
        await schema.validateAsync(req.body)
        .then(()=>{
            next();
        })
        .catch((error:any) => {
            PeopleMiddleware.processValidationError(error,res);
        });
    }
    async validatePeopleExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const peopleServices = PeopleServices.getInstance();
        const people = await peopleServices.readById(req.params.peopleId);
        if (people) {
            next();
        } else {
            res.status(404).send({error: `People ${req.params.peopleId} not found`});
        }
    }
    async extractPeopleId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.peopleId;
        next();
    }
    async calculatePages(req: express.Request, res: express.Response, next: express.NextFunction){
        const services = PeopleServices.getInstance();
        await services.count()
            .then((count) => calculatePageInfo(count,req))
            .catch((e)=>Logger.error(e))
        next();
    }
    async validateCountryQueryParamExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const services = PeopleServices.getInstance();
        const factory = new FilterQueryParamFactory();
        const filterConfig = factory.create(PeopleQueryAttributes);
        const filterStatement = filterByKey(req,filterConfig)
        
        if(Object.keys(filterStatement).length == 0)
            next();
        else{
            const result = await services.list(RECORD_LIMIT,0,filterStatement);
            if (result && result.length > 0)
                next();
            else
                res.status(404).send({error: `People not found`});
        }
    }
}