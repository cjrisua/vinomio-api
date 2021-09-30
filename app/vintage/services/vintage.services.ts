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

    create(resource: any){
        return VintageDaos.getInstance().addVintage(resource);
    }
    deleteById(resourceId: any){
        return VintageDaos.getInstance().removeVintageById(resourceId);
    }
    list(limit: number, page: number){
        return VintageDaos.getInstance().listVintages(limit, page);
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
}