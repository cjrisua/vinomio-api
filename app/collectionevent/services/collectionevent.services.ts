import { CRUD } from "../../common/interface/crud.interface";
import Logger from "../../lib/logger";
import { CollectionEventDaos } from "../daos/collectionevent.daos";

export class CollectioneventServices implements CRUD{
    private static instance: CollectioneventServices;

    constructor() {
        
    }

    static getInstance(): CollectioneventServices {
        if (!CollectioneventServices.instance) {
            CollectioneventServices.instance = new CollectioneventServices();
        }
        return CollectioneventServices.instance;
    }

    create(resource: any){
        return CollectionEventDaos.getInstance().addCollectionEvent(resource);
    }
    deleteById(resourceId: any){
        return CollectionEventDaos.getInstance().removeCollectioneventById(resourceId);
    }
    list(limit: number, page: number){
        return CollectionEventDaos.getInstance().listCollectionevents(limit, page);
    }
    patchById(resource: any){
        return CollectionEventDaos.getInstance().patchCollectionEvent(resource);
    }
    readById(resourceId: any){
        return CollectionEventDaos.getInstance().getCollectionEventById(resourceId);
    }
    updateById(resource: any){
        return CollectionEventDaos.getInstance().patchCollectionEvent(resource);
    }
}