import express from "express";
import { filterByKey, FilterQueryParamFactory, RECORD_LIMIT } from "../../common/common.middleware.config";
import Logger from "../../lib/logger";
import { ReviewServices } from "../services/review.services";
import { ReviewQueryAttributes } from "../types/review.qparam";

export class ReviewControllers {

  constructor(){

  }

  async listReviews(req: express.Request, res: express.Response) {
    const reviewServices = ReviewServices.getInstance();
    const reviews = await reviewServices.list(100,0);
    res.status(200).send(reviews);
  }
  async listReviewsByWineId(req: express.Request, res: express.Response) {
    const vintageServices = ReviewServices.getInstance();
    const factory = new FilterQueryParamFactory();
    const filterConfig = factory.create(ReviewQueryAttributes)
    const filterStatement = filterByKey(req,filterConfig)
    const reviews = await vintageServices.listByWineId(RECORD_LIMIT,0,req.params.wineId ,filterStatement);
    res.status(200).send({
      count:+req.body.count,
      pages:+req.body.pages,
      rows:reviews
    });
  }

  async getReviewById(req: express.Request, res: express.Response) {
    const reviewServices = ReviewServices.getInstance();
    const review = await reviewServices.readById(req.params.reviewId);
    res.status(200).send(review);
  }

  async createReview(req: express.Request, res: express.Response) {
    const reviewServices = ReviewServices.getInstance();
    const reviewId = await reviewServices.create(req.body);
    res.status(201).send({id: reviewId});
  }
  
  async patchReview(req: express.Request, res: express.Response) {
    const reviewServices = ReviewServices.getInstance();
    const review = await reviewServices.patchById(req.body);
    res.status(204).send(``);
  }

  async putReview(req: express.Request, res: express.Response) {
    const reviewServices = ReviewServices.getInstance();
    const review = await reviewServices.updateById(req.body);
    res.status(204).send(``);
  }

  async removeReview(req: express.Request, res: express.Response) {
    const reviewServices = ReviewServices.getInstance();
    const review = await reviewServices.deleteById(req.params.reviewId);
    res.status(204).send(``);
  }
}
