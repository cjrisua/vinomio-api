import { dbConfig, Allocation, Merchant, AllocationEvent } from "../../common/models"
import { AllocationFactory } from "../../common/models/allocations.model"
import * as shortUUID from "short-uuid";
import Logger from "../../lib/logger";
import { AllocationEventFactory } from "../../common/models/allocationevents.model";
import { IFilter } from "../../common/interface/filter.interface";
import { Op } from 'sequelize';
import { AllocationEventAttributes } from "../../allocationevent/types/allocationevent.type";
import { AllocationAttributes } from "../types/allocation.type";

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

export class AllocationDaos {

    private static Allocation = AllocationFactory(dbConfig);

    private static instance: AllocationDaos;


    constructor(){}
    
    public static getInstance() {
        if (!this.instance) {
            this.instance = new AllocationDaos();
        }
        return this.instance;
    }

    async addAllocation(allocationFields: any) {
        Logger.info(allocationFields)
        const AllocationEvent = AllocationEventFactory(dbConfig);
        let allocationId!:number
        await Allocation.create(allocationFields)
        .then(async (allocation)=>{
            allocationId = allocation.id
            if(allocationFields.events){
                let events:any[] = []
                allocationFields.events.map((e:any) =>{
                    const event = {name:e.name, month:e.month, allocationId:allocation.id}
                    events.push(event)
                })
                if(events.length > 0){
                    await AllocationEvent.bulkCreate(events)
                }
            }
        })
        return allocationId;
    }

    async listAllocationsByUserId(userId:any,limit: number = 25, page: number = 0,  filter:IFilter){
        const currentDate = new Date(Date.now())
        const futureDate = new Date(new Date().setDate(currentDate.getDate()+90));
        let allocation = AllocationFactory(dbConfig);

        let allocations = await Allocation.findAll(
            { 
                offset: page, 
                limit: limit,
                include: [
                    { 
                      model: Merchant, 
                       as:"merchant", 
                       attributes:['id','name','userId'],
                       where: { userId: userId}
                    },
                    { 
                      model: AllocationEvent, 
                      as:"events", 
                      attributes:['id','name','month']
                    }]
            })
         let results:AllocationAttributes[] = []
         let index:number = 0
         allocations.forEach(async (allocation:AllocationAttributes) => {
            const upcomingEvents = 
                allocation.events?.filter((e:AllocationEventAttributes) =>{
                    let eventDate = new Date(currentDate.getFullYear(), this.getMonthFromString(e.month || "").getMonth(),1);
                    let endDate = new Date(eventDate.setMonth(eventDate.getMonth()+1))
                    endDate = new Date(endDate.setDate(eventDate.getDate()-1))
                    return endDate > currentDate && endDate < futureDate
                }) || []
                if(upcomingEvents.length >0){
                    allocations[index].setDataValue('events',upcomingEvents)
                    results.push(allocations[index])
                }
                //else
                //    await allocations.at(index)?.destroy()
                index++
         })
        return results;
    }

    async listAllocations(limit: number = 25, page: number = 0,  filter:IFilter){
        const allocations = await Allocation.findAll(
            { 
                offset: page, 
                limit: limit,
                include: [
                    {model: Merchant, as:"merchant", attributes:['id','name','userId']},
                    {model: AllocationEvent, as:"events", attributes:['id','name','month']}]
            } )
        return allocations;
    }
    
    async removeAllocationById(allocationId: string){
        const allocations = await Allocation.destroy({where: {id: allocationId} })
        return allocations;
    }

    async getAllocationBySlug(slug: string){
        return Allocation.findOne({where: {slug: slug}});
    }

    async getAllocationById(allocationId: string) {
        return Allocation.findOne({where: {id: allocationId} });
    }
    private getMonthFromString(mon:string){
        //Logger.info(mon)
        var d = Date.parse(mon + `1, ${(new Date()).getFullYear()}`);
        if(!isNaN(d)){
            return new Date(d)
        }
        return new Date();
    }
    async patchAllocation(allocationFields: any) {
        const AllocationEvent = AllocationEventFactory(dbConfig);
        let allocation: any = await Allocation.findOne({where: {id: allocationFields.id}});
        if(allocation){
            for (let i in allocationFields) {
                allocation[i] = allocationFields[i];
            }
             await allocation.save()
        }
        const events:any[] = allocationFields.events;
        events.forEach(async i =>{
            const data = {id:i.id, name:i.name, month:i.month, allocationId:allocationFields.id}
            Logger.info(data)
            const [event , created] = await AllocationEvent.findOrCreate({
                where:{id:i.id},
                defaults:{
                    name:<string>i.name,
                    month:<string>i.month,
                    allocationId:<number>allocationFields.id
                }
            })
            if(!created){
                event.name = i.name
                event.month = i.month
                await event.save()
            }
        })
       
        /*
        const events:any[] = allocationFields.events;
        const updateEvents = events.filter(p => p.id).forEach((i)=>{
            
        })
        
        let newEventArray:any[]=[]
        const newEvents = events.filter(p => !p.id).forEach((i)=>{
            newEventArray.push({name:i.name, allocationId:allocationFields.id,month:i.month })
        })
        if(newEventArray.length>0)
            AllocationEvent.bulkCreate()
        */    
        return
    }
}
 