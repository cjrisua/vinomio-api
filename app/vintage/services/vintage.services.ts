import { CRUD } from "../../common/interface/crud.interface";
import Logger from "../../lib/logger";
import { VintageDaos } from "../daos/vintage.daos";

export class VintageServices implements CRUD{
    private static instance: VintageServices;

    constructor() {
        
    }

    static getInstance(): VintageServices {
        if (!VintageServices.instance) {
            VintageServices.instance = new VintageServices();
        }
        return VintageServices.instance;
    }
    count(){
        return VintageDaos.getInstance().vintageCount();
    }
    create(resource: any){
        return VintageDaos.getInstance().addVintage(resource);
    }
    deleteById(resourceId: any){
        return VintageDaos.getInstance().removeVintageById(resourceId);
    }
    list(limit: number, page: number, filter: any){
        return VintageDaos.getInstance().listVintages(limit, page, filter);
    }
    patchById(resource: any){
        return VintageDaos.getInstance().patchVintage(resource);
    }
    readById(resourceId: any){
        return VintageDaos.getInstance().getVintageById(resourceId);
    }
    updateById(resource: any){
        return VintageDaos.getInstance().patchVintage(resource);
    }
    deleteBlendVarietyBySlug(resource: any){
        return VintageDaos.getInstance().removeVintageByWineSlug(resource);
    }
}