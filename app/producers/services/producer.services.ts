import { CRUD } from "../../common/interface/crud.interface";
import { ProducerDao } from "../Daos/producers.dao";

export class ProducerService implements CRUD{
    private static instance: ProducerService;

    constructor() {
        
    }

    static getInstance(): ProducerService {
        if (!ProducerService.instance) {
            ProducerService.instance = new ProducerService();
        }
        return ProducerService.instance;
    }

    create(resource: any){
        return null;
    }
    deleteById(resourceId: any){
        return null;
    }
    list(limit: number, page: number){
        return ProducerDao.getInstance().listProducers(limit, page);
    }
    patchById(resource: any){
        return null;
    }
    readById(resourceId: any){
        return null;
    }
    updateById(resource: any){
        return null;
    }
}