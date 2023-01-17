import {CommonRoutesConfig,configureRoutes,} from "../common/common.routes.config";
import {ReviewControllers } from "./controllers/review.controllers";
import {ReviewMiddleware} from "./middleware/review.middleware";
import express from "express";

export class ReviewRoutes
  extends CommonRoutesConfig
  implements configureRoutes
{
  constructor(app: express.Application) {
    super(app, "ReviewsRoute");
    this.configureRoutes();
  }

  configureRoutes() {
    const reviewControllers = new ReviewControllers();
    const reviewMiddleware = ReviewMiddleware.getInstance();

    this.app.get("/api/review", [
        reviewMiddleware.calculatePages,
        reviewControllers.listReviews
    ]);
    this.app.get("/api/review/wine/:wineId", [
      reviewMiddleware.validateReviewQueryParamExists,
      reviewMiddleware.calculatePages,
      reviewControllers.listReviewsByWineId
    ]);
    this.app.post("/api/review", [
        reviewMiddleware.validateAddOrUpdate,
        reviewControllers.createReview
    ]);
    this.app.put(`/api/review/:reviewId`, [
        reviewMiddleware.validateAddOrUpdate,
        reviewMiddleware.validateReviewExists,
        reviewMiddleware.extractReviewId,
        reviewControllers.putReview
    ]);
    this.app.patch(`/api/review/:reviewId`, [
        reviewMiddleware.validateAddOrUpdate,
        reviewMiddleware.validateReviewExists,
        reviewMiddleware.extractReviewId,
        reviewControllers.patchReview
    ]);
    this.app.delete(`/api/review/:reviewId`, [
      reviewMiddleware.validateReviewExists,
      reviewControllers.removeReview,
    ]);
    this.app.get(`/api/review/:reviewId`, [
      reviewMiddleware.validateReviewExists,
      reviewControllers.getReviewById,
    ]);
  }
}
