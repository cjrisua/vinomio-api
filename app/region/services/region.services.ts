import { CRUD } from "../../common/interface/crud.interface";
import Logger from "../../lib/logger";
import { RegionDaos } from "../daos/region.daos";

export class RegionServices implements CRUD{
    private static instance: RegionServices;

    constructor() {
        
    }

    static getInstance(): RegionServices {
        if (!RegionServices.instance) {
            RegionServices.instance = new RegionServices();
        }
        return RegionServices.instance;
    }
    count(){
        return RegionDaos.getInstance().regionCount();
    }
    create(resource: any){
        return RegionDaos.getInstance().addRegion(resource);
    }
    deleteById(resourceId: any){
        return RegionDaos.getInstance().removeRegionById(resourceId);
    }
    list(limit: number, page: number, filter: any){
        return RegionDaos.getInstance().listRegions(limit, page, filter);
    }
    customList(limit: number, page: number, filter: any){
        return RegionDaos.getInstance().listRegionsWithParent(limit, page, filter)
    }
    patchById(resource: any){
        return RegionDaos.getInstance().patchRegion(resource);
    }
    readById(resourceId: any){
        return RegionDaos.getInstance().getRegionById(resourceId);
    }
    updateById(resource: any){
        return RegionDaos.getInstance().patchRegion(resource);
    }
}