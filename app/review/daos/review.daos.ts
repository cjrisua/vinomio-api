import { dbConfig, People, Review, Tag, Vintage, Wine } from "../../common/models"
import { ReviewFactory } from "../../common/models/reviews.model"
import { TagFactory } from "../../common/models/tags.model";
import { QueryTypes } from "sequelize";
import Logger from "../../lib/logger";
import { Filter, IFilter } from "../../common/interface/filter.interface";
import sequelize from "sequelize";
declare module 'sequelize' {
  export function col(val: string): string;
}

export class ReviewDaos {
  private static Review = ReviewFactory(dbConfig);
  private static instance: ReviewDaos;

  constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new ReviewDaos();
    }
    return this.instance;
  }
  async reviewCount(){
    const query:string = 'SELECT COUNT("Reviews"."id") FROM "Reviews"';
    const result:any =  await dbConfig.query(query,{ raw: true,type: QueryTypes.SELECT,})
    return +result[0].count;
  }
  async reviewTotalsByWine(wineId:any){
    return Review.findAll({
      attributes:['score','vintageId'],
      raw: true,
      include: [
        { model: Vintage, as: "vintage", where: { wineId: wineId } }
      ],
    });
  }
  async addReview(reviewFields: any) {
    const review = await Review.create(reviewFields).then(async (response) => {
      if (reviewFields?.tags) {
        //Logger.info(reviewFields.tags)
        await TagFactory(dbConfig)
          .bulkCreate(reviewFields.tags, {
            updateOnDuplicate: ["name"],
            returning: true,
          })
          .then((tagCollection) => {
            tagCollection.forEach((tagInstance) =>
              response.addTags(tagInstance.id)
            );
          });
      }

      return response;
    });

    return review.id;
  }

  async listReviews(limit: number = 25, page: number = 0) {
    const reviews = await Review.findAll({
      offset: page,
      limit: limit,
      include: [
        { model: Tag },
        { model: People, as: "people" },
        { model: Vintage, as: "vintage", include: [{ model: Wine }] },
      ],
    });
    return reviews;
  }

  async removeReviewById(reviewId: string) {
    const reviews = await Review.destroy({ where: { id: reviewId } });
    return reviews;
  }

  async getReviewBySlug(slug: string) {
    return Review.findOne({ where: { slug: slug } });
  }

  async getReviewById(reviewId: string) {
    return Review.findOne({ where: { id: reviewId } });
  }
  async getReviewByWineId(limit: number = 25, page: number = 0, wineId: string, filter:IFilter) {
    Logger.info(filter)
    return Review.findAll({
      offset: page,
      limit: limit,
      where: filter.where,
      include: [{ model: Vintage, as: "vintage", where: { wineId: wineId } }],
    });
  }
  async getReviewByVintageId(vintageId: string) {
    return Review.findOne({ where: { id: vintageId } });
  }

  async patchReview(reviewFields: any) {
    console.log(JSON.stringify(reviewFields));
    let review: any = await Review.findOne({ where: { id: reviewFields.id } });
    if (review) {
      for (let i in reviewFields) {
        review[i] = reviewFields[i];
      }
      return await review.save();
    }
  }
}
 