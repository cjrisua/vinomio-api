
import express from 'express';
import { CommonMiddlewareConfig, filterByKeyFindAll } from '../../common/common.middleware.config';
import {ProducerServices} from '../services/producer.services';

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
    async validateProducerQueryParamExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const producerServices = ProducerServices.getInstance();
        const filterStatement = filterByKeyFindAll(req)
        const producer = await producerServices.list(100,0,filterStatement);
        if (producer && producer.length > 0) {
            next();
        } else {
            res.status(404).send({error: `Producer not found`});
        }
    }
    async extractProducerId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.producerId;
        next();
    }
}