import { CRUD } from "../../common/interface/crud.interface";
import Logger from "../../lib/logger";
import { ProducerDao } from "../daos/producers.dao";

export class ProducerService implements CRUD{
    private static instance: ProducerService;

    constructor() {
        
    }

    static getInstance(): ProducerService {
        if (!ProducerService.instance) {
            //Logger.info("New DAO Instance");
            ProducerService.instance = new ProducerService();
        }
        //Logger.info("Return DAO Instance");
        return ProducerService.instance;
    }

    create(resource: any){
        return ProducerDao.getInstance().addProducer(resource);
    }
    deleteById(resourceId: any){
        return ProducerDao.getInstance().removeProducerById(resourceId);
    }
    list(limit: number, page: number){
        return ProducerDao.getInstance().listProducers(limit, page);
    }
    patchById(resource: any){
        return ProducerDao.getInstance().patchProducer(resource);
    }
    readById(resourceId: any){
        return ProducerDao.getInstance().getProducerById(resourceId);
    }
    updateById(resource: any){
        return ProducerDao.getInstance().patchProducer(resource);
    }
}