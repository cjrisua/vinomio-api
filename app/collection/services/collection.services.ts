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
        return CollectionDaos.getInstance().addCollection(resource);
    }
    deleteById(resourceId: any){
        return CollectionDaos.getInstance().removeCollectionById(resourceId);
    }
    list(limit: number, page: number){
        return CollectionDaos.getInstance().listCollections(limit, page);
    }
    patchById(resource: any){
        return CollectionDaos.getInstance().patchCollection(resource);
    }
    readById(resourceId: any){
        return CollectionDaos.getInstance().getCollectionById(resourceId);
    }
    updateById(resource: any){
        return CollectionDaos.getInstance().patchCollection(resource);
    }
}