
import express from 'express';
import {ProducerService} from '../services/producer.services';

export class ProducersMiddleware {
    private static instance: ProducersMiddleware;

    static getInstance() {
        if (!ProducersMiddleware.instance) {
            ProducersMiddleware.instance = new ProducersMiddleware();
        }
        return ProducersMiddleware.instance;
    }
    async validateProducerExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const producerService = ProducerService.getInstance();
        const producer = await producerService.readById(req.params.producerId);
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