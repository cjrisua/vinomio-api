
import express from 'express';
import { CommonMiddlewareConfig, filterByKey, filterByKeyFindAll, FilterQueryParamFactory } from '../../common/common.middleware.config';
import { IFilter } from '../../common/interface/filter.interface';
import { ProducerSchemaFactory } from '../schema/producer.schema';
import {ProducerServices} from '../services/producer.services';
import { ProducerQueryAttributes } from '../types/producer.qparam';

export class ProducerMiddleware extends CommonMiddlewareConfig{
    private static instance: ProducerMiddleware;

    static getInstance() {
        if (!ProducerMiddleware.instance) {
            ProducerMiddleware.instance = new ProducerMiddleware();
        }
        return ProducerMiddleware.instance;
    }
    async validateProducerExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const producerServices = ProducerServices.getInstance();
        if(isNaN(Number(req.params.producerId))){
            res.status(422).send({error: `Unprocessable Producer Id: ${req.params.producerId}`});
        }
        else{
            const producer = await producerServices.readById(req.params.producerId);
            if (producer) {
                next();
            } else {
                res.status(404).send({error: `Producer ${req.params.producerId} not found`});
            }
        }
    }
    async validateProducersIsUnique(req: express.Request, res: express.Response, next: express.NextFunction) {
        const producerServices = ProducerServices.getInstance();
        const filter : IFilter = { where: {slug: ProducerMiddleware.slugify(req.body.name)}}
        const producer = await producerServices.list(1,0,filter);
        if (producer && producer.length > 0)
            res.status(409).send({error: `Country ${req.body.name} exists`});
        else
            next();
    }
    async validateProducerPOST(req: express.Request, res: express.Response, next: express.NextFunction){
        const schema = ProducerSchemaFactory().CreatePOST;
        await schema.validateAsync(req.body)
        .then(()=>{
            next();
        })
        .catch((error:any) => {
            ProducerMiddleware.processValidationError(error,res);
        });
    }
    async validateProducerQueryParamExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const services = ProducerServices.getInstance();
        const factory = new FilterQueryParamFactory();
        const filterConfig = factory.create(ProducerQueryAttributes);
        const filterStatement = filterByKey(req,filterConfig)

        if(Object.keys(filterStatement).length == 0)
            next();
        else{
            const result = await services.list(100,0,filterStatement);
            if (result && result.length > 0) {
                next();
            } else {
                res.status(404).send({error: `Query not found`});
            }
        }
    }
    async extractProducerId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.producerId;
        next();
    }
}