import { dbConfig, AllocationEvent } from "../../common/models"
import { AllocationEventFactory } from "../../common/models/allocationevents.model"
import * as shortUUID from "short-uuid";
import { QueryTypes } from "sequelize";
import Logger from "../../lib/logger";
import { string } from "joi";
import { IFilter } from "../../common/interface/filter.interface";

export class AllocationEventDaos {

    private static AllocationEvent = AllocationEventFactory(dbConfig)
    private static instance: AllocationEventDaos;


    constructor(){}
    
    public static getInstance() {
        if (!this.instance) {
            this.instance = new AllocationEventDaos();
        }
        return this.instance;
    }

    async addAllocationEvent(allocationeventFields: any) {
        const allocationevent = await AllocationEvent.create(allocationeventFields);
        return allocationevent.id;
    }

    async listAllocationEvents(limit: number = 25, page: number = 0,  filter:IFilter){
        const allocationevents = await AllocationEvent.findAll({ 
            where:filter.where, 
            offset: page, 
            limit: limit } )
        return allocationevents;
    }
    
    async removeAllocationEventById(allocationeventId: string){
        const allocationevents = await AllocationEvent.destroy({where: {id: allocationeventId} })
        return allocationevents;
    }

    async getAllocationEventBySlug(slug: string){
        return AllocationEvent.findOne({where: {slug: slug}});
    }
    async getAllocationEventByMerchant(merchantId: number){

        const merchant_query:string = `
        SELECT "AE"."id" as "eventId", "M"."id" as "merchantId", 
        "A"."id" as "allocationId","AE"."slug", "AE"."name" , 
        "AE"."month","A"."status", "A"."memberSince", "A"."lastPurchase" 
        FROM "Merchants" AS "M" 
        LEFT JOIN "Allocations" AS "A" on "M"."id" = "A"."merchantId" 
        LEFT JOIN "AllocationEvents" as "AE" on "A"."id" = "AE"."allocationId" 
        WHERE "M"."id" = :merchantId 
        GROUP by  "AE"."id" ,"M"."id", "A"."id","AE"."slug", "AE"."name", "AE"."month", "A"."status", "A"."memberSince", "A"."lastPurchase"`

        const r:any =  await dbConfig.query(merchant_query, {
            replacements: { merchantId: merchantId },
            raw: true,
            type: QueryTypes.SELECT,
            }).then((m:any[]) =>  { 
                let results: { 
                    allocationId: number; 
                    slug: string; 
                    name: string; 
                    eventId:number;
                    month:string;
                    allocation:{
                        merchantId: number;
                        status:string,
                        memberSince:Date,
                        lastPurchase:Date
                    }
                }[] = []
                m.forEach((i) => {results.push({
                    allocationId:i.allocationId,
                    slug:i.slug,
                    name:i.name,
                    eventId:i.eventId,
                    month:i.month,
                    allocation:{
                        merchantId:i.merchantId, 
                        status:i.status,
                        memberSince:i.memberSince,
                        lastPurchase:i.lastPurchase
                    }
                })});
                return results
             })
        
        return r 
        
        //return AllocationEvent.findOne({where: {slug: slug}});
    }

    async getAllocationEventById(allocationeventId: string) {
        return AllocationEvent.findOne({where: {id: allocationeventId} });
    }

    async patchAllocationEvent(allocationeventFields: any) {
        console.log(JSON.stringify(allocationeventFields))
        let allocationevent: any = await AllocationEvent.findOne({where: {id: allocationeventFields.id}});
        if(allocationevent){
            for (let i in allocationeventFields) {
                allocationevent[i] = allocationeventFields[i];
            }
            return await allocationevent.save()
        }
    }
}
 