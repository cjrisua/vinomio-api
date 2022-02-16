import { CRUD } from "../../common/interface/crud.interface";
import Logger from "../../lib/logger";
import { AllocationEventOfferDaos } from "../daos/AllocationEventOffer.daos";

export class AllocationEventOfferServices implements CRUD{
    private static instance: AllocationEventOfferServices;

    constructor() {
        
    }

    static getInstance(): AllocationEventOfferServices {
        if (!AllocationEventOfferServices.instance) {
            AllocationEventOfferServices.instance = new AllocationEventOfferServices();
        }
        return AllocationEventOfferServices.instance;
    }

    create(resource: any){
        return AllocationEventOfferDaos.getInstance().addAllocationEventOffer(resource);
    }
    deleteById(resourceId: any){
        return AllocationEventOfferDaos.getInstance().removeAllocationEventOfferById(resourceId);
    }
    list(limit: number, page: number){
        return AllocationEventOfferDaos.getInstance().listAllocationEventOffers(limit, page);
    }
    patchById(resource: any){
        return AllocationEventOfferDaos.getInstance().patchAllocationEventOffer(resource);
    }
    readById(resourceId: any){
        return AllocationEventOfferDaos.getInstance().getAllocationEventOfferById(resourceId);
    }
    updateById(resource: any){
        return AllocationEventOfferDaos.getInstance().patchAllocationEventOffer(resource);
    }
}