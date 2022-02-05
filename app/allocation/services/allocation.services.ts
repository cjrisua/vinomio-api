import { CRUD } from "../../common/interface/crud.interface";
import Logger from "../../lib/logger";
import { AllocationDaos } from "../daos/allocation.daos";

export class AllocationServices implements CRUD{
    private static instance: AllocationServices;

    constructor() {
        
    }

    static getInstance(): AllocationServices {
        if (!AllocationServices.instance) {
            AllocationServices.instance = new AllocationServices();
        }
        return AllocationServices.instance;
    }

    create(resource: any){
        return AllocationDaos.getInstance().addAllocation(resource);
    }
    deleteById(resourceId: any){
        return AllocationDaos.getInstance().removeAllocationById(resourceId);
    }
    list(limit: number, page: number){
        return AllocationDaos.getInstance().listAllocations(limit, page);
    }
    patchById(resource: any){
        return AllocationDaos.getInstance().patchAllocation(resource);
    }
    readById(resourceId: any){
        return AllocationDaos.getInstance().getAllocationById(resourceId);
    }
    updateById(resource: any){
        return AllocationDaos.getInstance().patchAllocation(resource);
    }
}