import { CRUD } from "../../common/interface/crud.interface";
import Logger from "../../lib/logger";
import { AllocationEventDaos } from "../daos/allocationevent.daos";

export class AllocationEventServices implements CRUD{
    private static instance: AllocationEventServices;

    constructor() {
        
    }

    static getInstance(): AllocationEventServices {
        if (!AllocationEventServices.instance) {
            AllocationEventServices.instance = new AllocationEventServices();
        }
        return AllocationEventServices.instance;
    }

    create(resource: any){
        return AllocationEventDaos.getInstance().addAllocationEvent(resource);
    }
    deleteById(resourceId: any){
        return AllocationEventDaos.getInstance().removeAllocationEventById(resourceId);
    }
    list(limit: number, page: number){
        return AllocationEventDaos.getInstance().listAllocationEvents(limit, page);
    }
    patchById(resource: any){
        return AllocationEventDaos.getInstance().patchAllocationEvent(resource);
    }
    readByMerchantId(merchantId:any){
        return AllocationEventDaos.getInstance().getAllocationEventByMerchant(merchantId);
    }
    readById(resourceId: any){
        return AllocationEventDaos.getInstance().getAllocationEventById(resourceId);
    }
    updateById(resource: any){
        return AllocationEventDaos.getInstance().patchAllocationEvent(resource);
    }
}