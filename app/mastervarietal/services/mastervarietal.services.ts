import { CRUD } from "../../common/interface/crud.interface";
import Logger from "../../lib/logger";
import { MasterVarietalDaos } from "../daos/mastervarietal.daos";

export class MasterVarietalServices implements CRUD{
    private static instance: MasterVarietalServices;

    constructor() {
        
    }

    static getInstance(): MasterVarietalServices {
        if (!MasterVarietalServices.instance) {
            MasterVarietalServices.instance = new MasterVarietalServices();
        }
        return MasterVarietalServices.instance;
    }
    count(){
        return MasterVarietalDaos.getInstance().mastervarietalCount();
    }
    create(resource: any){
        return MasterVarietalDaos.getInstance().addMastervarietal(resource);
    }
    deleteById(resourceId: any){
        return MasterVarietalDaos.getInstance().removeMastervarietalById(resourceId);
    }
    list(limit: number, page: number, filter:any){
        return MasterVarietalDaos.getInstance().listMastervarietals(limit, page, filter);
    }
    patchById(resource: any){
        return MasterVarietalDaos.getInstance().patchMastervarietal(resource);
    }
    readById(resourceId: any){
        return MasterVarietalDaos.getInstance().getMastervarietalById(resourceId);
    }
    updateById(resource: any){
        return MasterVarietalDaos.getInstance().patchMastervarietal(resource);
    }
    deleteBlendVarietyBySlug(resource: any){
        return MasterVarietalDaos.getInstance().removeVariety(resource);
    }
}