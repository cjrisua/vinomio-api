import { number } from "joi";
import { CRUD } from "../../common/interface/crud.interface";
import Logger from "../../lib/logger";
import { CountryDaos } from "../daos/country.daos";

export class CountryServices implements CRUD{
    private static instance: CountryServices;

    constructor() {
        
    }

    static getInstance(): CountryServices {
        if (!CountryServices.instance) {
            CountryServices.instance = new CountryServices();
        }
        return CountryServices.instance;
    }
    count(){
        return CountryDaos.getInstance().countryCount();
    }
    create(resource: any){
        return CountryDaos.getInstance().addCountry(resource);
    }
    deleteById(resourceId: any){
        return CountryDaos.getInstance().removeCountryById(resourceId);
    }
    list(limit: number, page: number, filter: any){
        return CountryDaos.getInstance().listCountries(limit, page, filter);
    }
    patchById(resource: any){
        return CountryDaos.getInstance().patchCountry(resource);
    }
    readById(resourceId: any){
        return CountryDaos.getInstance().getCountryById(resourceId);
    }
    updateById(resource: any){
        return CountryDaos.getInstance().patchCountry(resource);
    }
}