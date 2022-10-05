
import express from 'express';
import { TagServices } from '../services/tag.services';

export class TagMiddleware {
    private static instance: TagMiddleware;

    static getInstance() {
        if (!TagMiddleware.instance) {
            TagMiddleware.instance = new TagMiddleware();
        }
        return TagMiddleware.instance;
    }
    async validateTagExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const tagServices = TagServices.getInstance();
        const tag = await tagServices.readById(req.params.tagId);
        if (tag) {
            next();
        } else {
            res.status(404).send({error: `Tag ${req.params.tagId} not found`});
        }
    }
    async extractTagId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.tagId;
        next();
    }
}