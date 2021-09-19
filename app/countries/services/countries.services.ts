import { CRUD } from "../../common/interface/crud.interface";
import Logger from "../../lib/logger";
import { CountryDao } from "../daos/countries.daos";

export class CountryService implements CRUD{
    private static instance: CountryService;

    constructor() {
        
    }

    static getInstance(): CountryService {
        if (!CountryService.instance) {
            //Logger.info("New DAO Instance");
            CountryService.instance = new CountryService();
        }
        //Logger.info("Return DAO Instance");
        return CountryService.instance;
    }

    create(resource: any){
        return CountryDao.getInstance().addCountry(resource);
    }
    deleteById(resourceId: any){
        return CountryDao.getInstance().removeCountryById(resourceId);
    }
    list(limit: number, page: number){
        return CountryDao.getInstance().listCountries(limit, page);
    }
    patchById(resource: any){
        return CountryDao.getInstance().patchCountry(resource);
    }
    readById(resourceId: any){
        return CountryDao.getInstance().getCountryById(resourceId);
    }
    updateById(resource: any){
        return CountryDao.getInstance().patchCountry(resource);
    }
}