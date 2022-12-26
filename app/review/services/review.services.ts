import { CRUD } from "../../common/interface/crud.interface";
import Logger from "../../lib/logger";
import { ReviewDaos } from "../daos/review.daos";

export class ReviewServices implements CRUD{
    private static instance: ReviewServices;
    constructor() {
        
    }
    static getInstance(): ReviewServices {
        if (!ReviewServices.instance) {
            ReviewServices.instance = new ReviewServices();
        }
        return ReviewServices.instance;
    }
    count(){
        return ReviewDaos.getInstance().reviewCount();
    }
    create(resource: any){
        return ReviewDaos.getInstance().addReview(resource);
    }
    deleteById(resourceId: any){
        return ReviewDaos.getInstance().removeReviewById(resourceId);
    }
    list(limit: number, page: number){
        return ReviewDaos.getInstance().listReviews(limit, page)
    }
    patchById(resource: any){
        return ReviewDaos.getInstance().patchReview(resource);
    }
    readById(resourceId: any){
        return ReviewDaos.getInstance().getReviewById(resourceId);
    }
    listByWineId(limit: number, page: number, wineId:string, filter:any ){
        return ReviewDaos.getInstance().getReviewByWineId(limit, page, wineId, filter);
    }
    updateById(resource: any){
        return ReviewDaos.getInstance().patchReview(resource);
    }
}