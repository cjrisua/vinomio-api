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
    count(){
        return AllocationDaos.getInstance().allocationCount();
    }
    create(resource: any){
        return AllocationDaos.getInstance().addAllocation(resource);
    }
    deleteById(resourceId: any){
        return AllocationDaos.getInstance().removeAllocationById(resourceId);
    }
    list(limit: number, page: number,filter:any){
        return AllocationDaos.getInstance().listAllocations(limit, page,filter)
        .then((res:any)=> {Logger.info(res.length); return res })
        .catch((error)=> { throw error});
    }
    listByUserId(userId:any, limit: number, page: number,filter:any){
        return AllocationDaos.getInstance().listAllocationsByUserId(userId,limit, page,filter);
    }
    listLastPurchases(cellarId:any, limit: number, page: number,filter:any){
        return AllocationDaos.getInstance().listAllocationLastPurchases(cellarId, limit, page, filter)
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