
import express from 'express';
import { CommonMiddlewareConfig } from '../../common/common.middleware.config';
import { PeopleSchemaFactory } from '../schema/people.schema';
import { PeopleServices } from '../services/people.services';

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
}