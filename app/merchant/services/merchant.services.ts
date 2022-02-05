import { CRUD } from "../../common/interface/crud.interface";
import Logger from "../../lib/logger";
import { MerchantDaos } from "../daos/merchant.daos";

export class MerchantServices implements CRUD{
    private static instance: MerchantServices;

    constructor() {
        
    }

    static getInstance(): MerchantServices {
        if (!MerchantServices.instance) {
            MerchantServices.instance = new MerchantServices();
        }
        return MerchantServices.instance;
    }

    create(resource: any){
        return MerchantDaos.getInstance().addMerchant(resource);
    }
    deleteById(resourceId: any){
        return MerchantDaos.getInstance().removeMerchantById(resourceId);
    }
    list(limit: number, page: number, filter:any){
        return MerchantDaos.getInstance().listMerchants(limit, page, filter);
    }
    patchById(resource: any){
        return MerchantDaos.getInstance().patchMerchant(resource);
    }
    readById(resourceId: any){
        return MerchantDaos.getInstance().getMerchantById(resourceId);
    }
    updateById(resource: any){
        return MerchantDaos.getInstance().patchMerchant(resource);
    }
}