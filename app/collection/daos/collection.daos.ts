import { dbConfig, Collection, CollectionEvent, Wine, Vintage, Producer, Region, MasterVarietal } from "../../common/models"
import { CollectionFactory } from "../../common/models/collections.model"
import * as shortUUID from "short-uuid";
import Logger from "../../lib/logger";
import { AllocationFactory } from "../../common/models/allocations.model";
import { CollectionEventFactory } from "../../common/models/collectionevents.model";
import { CollectioneventAttributes } from "../../collectionevent/types/collectionevent.type";
import { IFilter } from "../../common/interface/filter.interface";

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

    async addCollection(collectionFields: any[])
    {
        //Logger.info(collectionFields)
        const collectionEvent = CollectionEventFactory(dbConfig)
        let result:any[] = []
        
        collectionFields.forEach(async (wine:any) =>{
            const bottles = 
                Array(parseInt(wine.bottleCount)).fill(0)
                .map(x =>  JSON.parse(JSON.stringify(wine)));

            const collection = await this.Collection.bulkCreate(bottles).then(async (items)=>{
                const purchasedOn = items.map((p:any) => { return {
                        'action':'PurchasedOn', 
                        'actionDate': wine.purchasedOn,
                        'collectionId':p.id
                }})
                await collectionEvent.bulkCreate(purchasedOn).then(async ()=>
                {
                    if(bottles[0].statusId == "pending" || bottles[0].statusId == "allocated")
                    {
                        const deliverBy = items.map((p:any) => {
                            return {
                            'action': bottles[0].statusId == "pending" ? 'DeliveredBy' : 'DeliveredOn', 
                            'actionDate': wine.deliverBy,
                            'collectionId':p.id
                            }
                        });
                        await collectionEvent.bulkCreate(deliverBy)
                    }
                })
                //result.push(collection);
            })
        });

        return {}
    }

    async listCollections(limit: number = 25, page: number = 0, filter:IFilter){
        const collections = await Collection.findAll(
            { 
                where:filter.where, 
                offset: page, limit: limit,
                include:[
                    {model: CollectionEvent, attributes:['id','action','createdAt']},
                    //{model: Wine, attributes:['id','name']},
                    {model: Vintage, attributes:['id','year'], 
                        include: [
                            {model: Wine, attributes:['id','name','color','type'],
                        include:[
                            {model: Producer, attributes:['name']},
                            {model: Region, attributes:['name']},
                            {model: MasterVarietal, attributes:['name']}
                        ]}
                        ]},
                ]
            }).catch((message) => Logger.warn(message));
        return collections;
    }
    
    async removeCollectionById(collectionId: string){
        const collections = await Collection.destroy({
            where: {id: collectionId} 
        })
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
 