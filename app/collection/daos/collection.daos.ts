import { dbConfig, Collection, CollectionEvent } from "../../common/models"
import { CollectionFactory } from "../../common/models/collections.model"
import * as shortUUID from "short-uuid";
import Logger from "../../lib/logger";
import { AllocationFactory } from "../../common/models/allocations.model";
import { CollectionEventFactory } from "../../common/models/collectionevents.model";
import { CollectioneventAttributes } from "../../collectionevent/types/collectionevent.type";

export function groupBy (array: any[], key: string | number)  {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };

export class CollectionDaos {

    private  Collection = CollectionFactory(dbConfig)
    private static instance: CollectionDaos;


    constructor(){}
    
    public static getInstance() {
        if (!this.instance) {
            this.instance = new CollectionDaos();
        }
        return this.instance;
    }

    async addCollection(collectionFields: any) {

        const collectionEvent = CollectionEventFactory(dbConfig)
        //Logger.info(collectionFields)

        let datacollection:any[] = []
        for(let i=0; i < collectionFields.bottleCount; i++)
          datacollection.push(JSON.parse(JSON.stringify(collectionFields)))
        
        //Collection.
        const collection = await this.Collection.bulkCreate(datacollection).then(async (items)=>{
           const purchasedOn = items.map((p:any) => {return {
                'action':'PurchasedOn', 
                'actionDate': p.purchasedOn,
                'collectionId':p.id
           }})
           await collectionEvent.bulkCreate(purchasedOn).then(async ()=>{
                if(datacollection[0].statusId == "pending"){
                    const deliverBy = items.map((p:any) => {return {
                        'action':'DeliveredBy', 
                        'actionDate': p.deliverBy,
                        'collectionId':p.id
                   }});
                   await collectionEvent.bulkCreate(deliverBy)
                }
           })
        })
        
          /*
          const collection = await this.Collection.create(collectionFields)
          .then(async (p) =>{
             
              await collectionEvent.create(
                  {
                  'action':'PurchasedOn', 
                  'actionDate': collectionFields.purchasedOn,
                  'collectionId':p.id
                })

                if(p.statusId == "pending"){
                    await collectionEvent.create(
                        {
                        'action':'DeliveredBy', 
                        'actionDate': collectionFields.deliverBy,
                        'collectionId':p.id
                      })
                }

                return p;
          });*/
         
       // Logger.info(datacollection)

        //const collection = await this.Collection.bulkCreate(datacollection,{
        //    ignoreDuplicates: true,
        //  });
        //Logger.info(collection)
        //await collection[0].addEvent()
        return collection;
    }

    async listCollections(limit: number = 25, page: number = 0){
        const collections = await Collection.findAll({ offset: page, limit: limit,
            include:[{model: CollectionEvent, attributes:['id','action']}]} )
        return collections;
    }
    
    async removeCollectionById(collectionId: string){
        const collections = await Collection.destroy({where: {id: collectionId} })
        return collections;
    }

    async getCollectionById(collectionId: string) {
        return Collection.findOne({where: {id: collectionId} });
    }

    async patchCollection(collectionFields: any) {
        console.log(JSON.stringify(collectionFields))
        let collection: any = await Collection.findOne({where: {id: collectionFields.id}});
        if(collection){
            for (let i in collectionFields) {
                collection[i] = collectionFields[i];
            }
            return await collection.save()
        }
    }
}
 