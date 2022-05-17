import { CRUD } from "../../common/interface/crud.interface";
import Logger from "../../lib/logger";
import { VarietyDaos } from "../daos/variety.daos";

export class VarietyServices implements CRUD{
    private static instance: VarietyServices;

    constructor() {
        
    }

    static getInstance(): VarietyServices {
        if (!VarietyServices.instance) {
            VarietyServices.instance = new VarietyServices();
        }
        return VarietyServices.instance;
    }
    count(){
        return VarietyDaos.getInstance().varietyCount();
    }
    create(resource: any){
        return VarietyDaos.getInstance().addVariety(resource);
    }
    deleteById(resourceId: any){
        return VarietyDaos.getInstance().removeVarietyById(resourceId);
    }
    list(limit: number, page: number, filter: any){
        return VarietyDaos.getInstance().listVarieties(limit, page, filter);
    }
    patchById(resource: any){
        return VarietyDaos.getInstance().patchVariety(resource);
    }
    readById(resourceId: any){
        return VarietyDaos.getInstance().getVarietyById(resourceId);
    }
    updateById(resource: any){
        return VarietyDaos.getInstance().patchVariety(resource);
    }
}