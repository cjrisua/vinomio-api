
import express from 'express';
import {ProducerServices} from '../services/producer.services';

export class ProducerMiddleware {
    private static instance: ProducerMiddleware;

    static getInstance() {
        if (!ProducerMiddleware.instance) {
            ProducerMiddleware.instance = new ProducerMiddleware();
        }
        return ProducerMiddleware.instance;
    }
    async validateProducerExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const producerServices = ProducerServices.getInstance();
        const producer = await producerServices.readById(req.params.producerId);
        if (producer) {
            next();
        } else {
            res.status(404).send({error: `Producer ${req.params.producerId} not found`});
        }
    }
    async extractProducerId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.producerId;
        next();
    }
}