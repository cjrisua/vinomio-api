import { dbConfig, People, Review, Tag, Vintage, Wine } from "../../common/models"
import { ReviewFactory } from "../../common/models/reviews.model"
import { TagFactory } from "../../common/models/tags.model";
import { Op, QueryTypes } from "sequelize";
import Logger from "../../lib/logger";
import { Filter, IFilter } from "../../common/interface/filter.interface";
import sequelize from "sequelize";
import { number } from "joi";
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

  async listReviews(limit: number = 25, page: number = 0,  filter: IFilter) {
    Logger.info(filter)
    const query:string ='select "R".*,"P"."name" AS "people.name","P"."role" AS "people.role","P"."email" AS "people.email", "W"."id" AS "wine.id", "W"."name" AS "wine.name", "V"."year" AS "vintage.year" ,"T"."id" AS "tag.id","T"."name" AS "tag.name"  FROM "Reviews" AS "R" LEFT OUTER JOIN "ReviewTags" AS "RT" on "R"."id" = "RT"."reviewId" LEFT OUTER JOIN "People" AS "P" on "P"."id" = "R"."publisherId" LEFT OUTER JOIN "Tags" AS "T" on "T"."id" = "RT"."tagId" LEFT OUTER JOIN "Vintages" AS "V" on "R"."vintageId" = "V"."id"'+ 
    'LEFT OUTER JOIN "Wines" AS "W" on "W"."id" = "V"."wineId"'+
    (filter?.where?.vintage__wine__name ?  ` WHERE "W"."name" ILIKE :name ` :` ` )+ 
    'LIMIT :limit OFFSET :offset'

    const result:any =  await dbConfig.query(query,{ 
      replacements: { 
        limit: limit, 
        offset:page,
        name: filter?.where?.vintage__wine__name ? filter?.where?.vintage__wine__name[Op.iLike] : {}
       },
      raw: true,
      type: QueryTypes.SELECT}).then((resultSet:any[])=> {
        const data =  resultSet.reduce((r:Map<string,any[]>, dataSet:any) => {
          const review:any = {
            id:dataSet.id, review:dataSet.review, score:dataSet.score,createdAt:dataSet.createdAt,updatedAt:dataSet.updatedAt,
            people:{id:dataSet.publisherId, name:dataSet['people.name'],email:dataSet['people.email'],role:dataSet['people.role']},
            vintage:{id:dataSet.vintageId, year:dataSet['vintage.year'], Wine: {id:dataSet['wine.id'],name:dataSet['wine.name']}}
          }
          const key = dataSet.id;
          const item = r.get(key) || Object.assign({},review, {Tags:[]});
          item.Tags.push({id:dataSet['tag.id'],name:dataSet['tag.name']})
          return r.set(key,item)
        },new Map)
        return [ ...data.values()]
      }).catch((err)=>Logger.error(err))
      return result
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
    const cellarFilter = filter.where?.cellarId ? `INNER JOIN "Collections" AS "C" on "C"."vintageId" = "V"."id" AND "C"."cellarId" = ${filter.where?.cellarId} AND "C"."statusId" IN ('allocated','pending')` : ``
    const where:string = `WHERE "V"."wineId"=${wineId}`
    const query:string =`select "R".*,"P"."name" AS "people.name","P"."role" AS "people.role","P"."email" AS "people.email", "W"."id" AS "wine.id", "W"."name" AS "wine.name", "V"."year" AS "vintage.year" ,"T"."id" AS "tag.id","T"."name" AS "tag.name"  FROM "Reviews" AS "R" LEFT OUTER JOIN "ReviewTags" AS "RT" on "R"."id" = "RT"."reviewId" LEFT OUTER JOIN "People" AS "P" on "P"."id" = "R"."publisherId" LEFT OUTER JOIN "Tags" AS "T" on "T"."id" = "RT"."tagId" LEFT OUTER JOIN "Vintages" AS "V" on "R"."vintageId" = "V"."id" LEFT OUTER JOIN "Wines" AS "W" on "W"."id" = "V"."wineId"  ${cellarFilter} ${where} LIMIT :limit OFFSET :offset`
    const result:any =  await dbConfig.query(query,{ 
      replacements: { limit: limit, offset:page},
      raw: true,
      type: QueryTypes.SELECT}).then((resultSet:any[])=> {
        const data =  resultSet.reduce((r:Map<string,any[]>, dataSet:any) => {
          const review:any = {
            id:dataSet.id, review:dataSet.review, score:dataSet.score,createdAt:dataSet.createdAt,updatedAt:dataSet.updatedAt,
            people:{id:dataSet.publisherId, name:dataSet['people.name'],email:dataSet['people.email'],role:dataSet['people.role']},
            vintage:{id:dataSet.vintageId, year:dataSet['vintage.year'], Wine: {id:dataSet['wine.id'],name:dataSet['wine.name']}}
          }
          const key = dataSet.id;
          const item = r.get(key) || Object.assign({},review, {Tags:[]});
          item.Tags.push({id:dataSet['tag.id'],name:dataSet['tag.name']})
          return r.set(key,item)
        },new Map)
        return [ ...data.values()]
      }).catch((err)=>Logger.error(err))
      return result

    /*
    return Review.findAll({
      offset: page,
      limit: limit,
      where: filter.where,
      attributes:['id','review', 'score','updatedAt','vintageId'] ,
      include: [
        { model: Tag, attributes:['id','name'] },
        { model: People, as: "people" , attributes:['id','name','email','role']},
        //{ model: Vintage, as: "vintage", attributes:['id','year'], where: { wineId: wineId } }
      ],
    });*/
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
 