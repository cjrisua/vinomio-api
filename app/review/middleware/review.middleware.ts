
import express from 'express';
import { ReviewServices } from '../services/review.services';

export class ReviewMiddleware {
    private static instance: ReviewMiddleware;

    static getInstance() {
        if (!ReviewMiddleware.instance) {
            ReviewMiddleware.instance = new ReviewMiddleware();
        }
        return ReviewMiddleware.instance;
    }
    async validateReviewExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const reviewServices = ReviewServices.getInstance();
        const review = await reviewServices.readById(req.params.reviewId);
        if (review) {
            next();
        } else {
            res.status(404).send({error: `Review ${req.params.reviewId} not found`});
        }
    }
    async extractReviewId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.reviewId;
        next();
    }
}