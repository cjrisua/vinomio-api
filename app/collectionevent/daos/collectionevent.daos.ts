import { dbConfig, CollectionEvent } from "../../common/models"
import { CollectionEventFactory } from "../../common/models/collectionevents.model"
import * as shortUUID from "short-uuid";

export class CollectionEventDaos {

    private static CollectionEvent = CollectionEventFactory(dbConfig)
    private static instance: CollectionEventDaos;


    constructor(){}
    
    public static getInstance() {
        if (!this.instance) {
            this.instance = new CollectionEventDaos();
        }
        return this.instance;
    }

    async addCollectionEvent(collectioneventFields: any) {
        const collectionevent = await CollectionEvent.create(collectioneventFields);
        return collectionevent.id;
    }

    async listCollectionevents(limit: number = 25, page: number = 0){
        const collectionevents = await CollectionEvent.findAll({ offset: page, limit: limit } )
        return collectionevents;
    }
    
    async removeCollectioneventById(collectioneventId: string){
        const collectionevents = await CollectionEvent.destroy({where: {id: collectioneventId} })
        return collectionevents;
    }

    async getCollectionEventById(collectioneventId: string) {
        return CollectionEvent.findOne({where: {id: collectioneventId} });
    }

    async patchCollectionEvent(collectioneventFields: any) {
        console.log(JSON.stringify(collectioneventFields))
        let collectionevent: any = await CollectionEvent.findOne({where: {id: collectioneventFields.id}});
        if(collectionevent){
            for (let i in collectioneventFields) {
                collectionevent[i] = collectioneventFields[i];
            }
            return await collectionevent.save()
        }
    }
}
 