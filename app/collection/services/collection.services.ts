import { CRUD } from "../../common/interface/crud.interface";
import Logger from "../../lib/logger";
import { CollectionDaos } from "../daos/collection.daos";

export class CollectionServices implements CRUD{
    private static instance: CollectionServices;

    constructor() {
        
    }

    static getInstance(): CollectionServices {
        if (!CollectionServices.instance) {
            CollectionServices.instance = new CollectionServices();
        }
        return CollectionServices.instance;
    }

    create(resource: any){
        return CollectionDaos.getInstance()
        .addCollection(resource)
        .catch((error)=> { throw error});
    }
    deleteById(resourceId: any){
        return CollectionDaos.getInstance().removeCollectionById(resourceId);
    }
    list(limit: number, page: number, filter:any){
        return CollectionDaos.getInstance().listCollections(limit, page, filter);
    }
    patchById(resource: any){
        return CollectionDaos.getInstance().patchCollection(resource);
    }
    readById(resourceId: any){
        return CollectionDaos.getInstance().getCollectionById(resourceId);
    }
    readByWineId(cellarId:number, wineId:number, filter:any){
        return CollectionDaos.getInstance().findCollectionsByWineId(cellarId,wineId,filter);
    }
    updateById(resource: any){
        return CollectionDaos.getInstance().patchCollection(resource);
    }
}