
import express from 'express';
import { CollectioneventServices } from '../services/collectionevent.services';

export class CollectioneventMiddleware {
    private static instance: CollectioneventMiddleware;

    static getInstance() {
        if (!CollectioneventMiddleware.instance) {
            CollectioneventMiddleware.instance = new CollectioneventMiddleware();
        }
        return CollectioneventMiddleware.instance;
    }
    async validateCollectioneventExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const collectioneventServices = CollectioneventServices.getInstance();
        const collectionevent = await collectioneventServices.readById(req.params.collectioneventId);
        if (collectionevent) {
            next();
        } else {
            res.status(404).send({error: `CollectionEvent ${req.params.collectioneventId} not found`});
        }
    }
    async extractCollectioneventId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.collectioneventId;
        next();
    }
}