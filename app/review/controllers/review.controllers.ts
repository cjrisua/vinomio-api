import express from "express";
import { ReviewServices } from "../services/review.services";

export class ReviewControllers {

  constructor(){

  }

  async listReviews(req: express.Request, res: express.Response) {
    const reviewServices = ReviewServices.getInstance();
    const reviews = await reviewServices.list(100,0);
    res.status(200).send(reviews);
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
