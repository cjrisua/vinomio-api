import { CRUD } from "../../common/interface/crud.interface";
import Logger from "../../lib/logger";
import { CellarDaos } from "../daos/cellar.daos";

export class CellarServices implements CRUD{
    private static instance: CellarServices;

    constructor() {
        
    }

    static getInstance(): CellarServices {
        if (!CellarServices.instance) {
            CellarServices.instance = new CellarServices();
        }
        return CellarServices.instance;
    }

    create(resource: any){
        return CellarDaos.getInstance().addCellar(resource);
    }
    deleteById(resourceId: any){
        return CellarDaos.getInstance().removeCellarById(resourceId);
    }
    list(limit: number, page: number){
        return CellarDaos.getInstance().listCellars(limit, page);
    }
    patchById(resource: any){
        return CellarDaos.getInstance().patchCellar(resource);
    }
    readById(resourceId: any){
        return CellarDaos.getInstance().getCellarById(resourceId);
    }
    updateById(resource: any){
        return CellarDaos.getInstance().patchCellar(resource);
    }
}