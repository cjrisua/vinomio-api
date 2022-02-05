import { dbConfig, Allocation } from "../../common/models"
import { AllocationFactory } from "../../common/models/allocations.model"
import * as shortUUID from "short-uuid";
import Logger from "../../lib/logger";

export class AllocationDaos {

    private static Allocation = AllocationFactory(dbConfig)
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
        const allocation = await Allocation.create(allocationFields);
        return allocation.id;
    }

    async listAllocations(limit: number = 25, page: number = 0){
        const allocations = await Allocation.findAll({ offset: page, limit: limit } )
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

    async patchAllocation(allocationFields: any) {
        console.log(JSON.stringify(allocationFields))
        let allocation: any = await Allocation.findOne({where: {id: allocationFields.id}});
        if(allocation){
            for (let i in allocationFields) {
                allocation[i] = allocationFields[i];
            }
            return await allocation.save()
        }
    }
}
 