import { dbConfig, Review } from "../../common/models"
import { ReviewFactory } from "../../common/models/reviews.model"
import * as shortUUID from "short-uuid";

export class ReviewDaos {

    private static Review = ReviewFactory(dbConfig)
    private static instance: ReviewDaos;


    constructor(){}
    
    public static getInstance() {
        if (!this.instance) {
            this.instance = new ReviewDaos();
        }
        return this.instance;
    }

    async addReview(reviewFields: any) {
        const review = await Review.create(reviewFields);
        return review.id;
    }

    async listReviews(limit: number = 25, page: number = 0){
        const reviews = await Review.findAll({ offset: page, limit: limit } )
        return reviews;
    }
    
    async removeReviewById(reviewId: string){
        const reviews = await Review.destroy({where: {id: reviewId} })
        return reviews;
    }

    async getReviewBySlug(slug: string){
        return Review.findOne({where: {slug: slug}});
    }

    async getReviewById(reviewId: string) {
        return Review.findOne({where: {id: reviewId} });
    }

    async patchReview(reviewFields: any) {
        console.log(JSON.stringify(reviewFields))
        let review: any = await Review.findOne({where: {id: reviewFields.id}});
        if(review){
            for (let i in reviewFields) {
                review[i] = reviewFields[i];
            }
            return await review.save()
        }
    }
}
 