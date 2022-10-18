import { CRUD } from "../../common/interface/crud.interface";
import Logger from "../../lib/logger";
import { PeopleDaos } from "../daos/people.daos";

export class PeopleServices implements CRUD{
    private static instance: PeopleServices;

    constructor() {
        
    }

    static getInstance(): PeopleServices {
        if (!PeopleServices.instance) {
            PeopleServices.instance = new PeopleServices();
        }
        return PeopleServices.instance;
    }
    count(){
        return PeopleDaos.getInstance().peopleCount();
    }
    create(resource: any){
        return PeopleDaos.getInstance().addPeople(resource);
    }
    deleteById(resourceId: any){
        return PeopleDaos.getInstance().removePeopleById(resourceId);
    }
    list(limit: number, page: number, filter: any){
        return PeopleDaos.getInstance().listPeople(limit, page, filter);
    }
    patchById(resource: any){
        return PeopleDaos.getInstance().patchPeople(resource);
    }
    readById(resourceId: any){
        return PeopleDaos.getInstance().getPeopleById(resourceId);
    }
    updateById(resource: any){
        return PeopleDaos.getInstance().patchPeople(resource);
    }
}