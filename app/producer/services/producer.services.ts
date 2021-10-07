import { CRUD } from "../../common/interface/crud.interface";
import { IFilter } from "../../common/interface/filter.interface";
import Logger from "../../lib/logger";
import { ProducerDaos } from "../daos/producer.daos";

export class ProducerServices implements CRUD{
    private static instance: ProducerServices;

    constructor() {
        
    }

    static getInstance(): ProducerServices {
        if (!ProducerServices.instance) {
            ProducerServices.instance = new ProducerServices();
        }
        return ProducerServices.instance;
    }

    create(resource: any){
        return ProducerDaos.getInstance().addProducer(resource);
    }
    deleteById(resourceId: any){
        return ProducerDaos.getInstance().removeProducerById(resourceId);
    }
    list(limit: number, page: number, filter: any){
        return ProducerDaos.getInstance().listProducers(limit, page, filter);
    }
    patchById(resource: any){
        return ProducerDaos.getInstance().patchProducer(resource);
    }
    readById(resourceId: any){
        return ProducerDaos.getInstance().getProducerById(resourceId);
    }
    updateById(resource: any){
        return ProducerDaos.getInstance().patchProducer(resource);
    }
}