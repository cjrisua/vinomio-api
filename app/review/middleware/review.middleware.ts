
import express from 'express';
import { calculatePageInfo, CommonMiddlewareConfig, filterByKey, FilterQueryParamFactory, RECORD_LIMIT } from '../../common/common.middleware.config';
import Logger from '../../lib/logger';
import { ReviewSchemaFactory } from '../schema/review.schema';
import { ReviewServices } from '../services/review.services';
import { ReviewQueryAttributes } from '../types/review.qparam';

export class ReviewMiddleware extends CommonMiddlewareConfig{
    private static instance: ReviewMiddleware;

    static getInstance() {
        if (!ReviewMiddleware.instance) {
            ReviewMiddleware.instance = new ReviewMiddleware();
        }
        return ReviewMiddleware.instance;
    }
    async validateAddOrUpdate(req: express.Request, res: express.Response, next: express.NextFunction){
        const schema = ReviewSchemaFactory().AddOrUpdatePOST;
        await schema.validateAsync(req.body)
        .then(()=>{
            next();
        })
        .catch((error:any) => {
            ReviewMiddleware.processValidationError(error,res);
        });
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
    
    async calculatePages(req: express.Request, res: express.Response, next: express.NextFunction){
        const services = ReviewServices.getInstance();
        await services.count()
            .then((count) => calculatePageInfo(count,req))
            .catch((e)=>Logger.error(e))
        next();
    }
    
    async validateReviewQueryParamExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const service = ReviewServices.getInstance();
        const factory = new FilterQueryParamFactory();
        const filterConfig = factory.create(ReviewQueryAttributes);
        const filterStatement = filterByKey(req,filterConfig)
        if(Object.keys(filterStatement).length == 0)
            next();
        else{
            const review = await service.listByWineId(RECORD_LIMIT,0,req.params.wineId,filterStatement);
            if (review && review.length > 0) {
                next();
            } else {
                res.status(404).send({error: `Reviews not found`});
            }
        }
    }
}