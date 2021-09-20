import { CRUD } from "../../common/interface/crud.interface";
import Logger from "../../lib/logger";
import { WineDaos } from "../daos/wine.daos";

export class WineServices implements CRUD{
    private static instance: WineServices;

    constructor() {
        
    }

    static getInstance(): WineServices {
        if (!WineServices.instance) {
            WineServices.instance = new WineServices();
        }
        return WineServices.instance;
    }

    create(resource: any){
        return WineDaos.getInstance().addWine(resource);
    }
    deleteById(resourceId: any){
        return WineDaos.getInstance().removeWineById(resourceId);
    }
    list(limit: number, page: number){
        return WineDaos.getInstance().listWines(limit, page);
    }
    patchById(resource: any){
        return WineDaos.getInstance().patchWine(resource);
    }
    readById(resourceId: any){
        return WineDaos.getInstance().getWineById(resourceId);
    }
    updateById(resource: any){
        return WineDaos.getInstance().patchWine(resource);
    }
}