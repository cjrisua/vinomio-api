import { dbConfig, Country } from "../../common/models"
import { CountryFactory } from "../../common/models/countries.model"
import * as shortUUID from "short-uuid";

export class CountryDao {

    private static Country = CountryFactory(dbConfig)
    private static instance: CountryDao;


    constructor(){}
    
    public static getInstance() {
        if (!this.instance) {
            this.instance = new CountryDao();
        }
        return this.instance;
    }

    async addCountry(countryFields: any) {
        const country = await Country.create(countryFields);
        return country.id;
    }

    async listCountries(limit: number = 25, page: number = 0){
        const countries = await Country.findAll({ offset: page, limit: limit } )
        return countries;
    }
    
    async removeCountryById(countryId: string){
        const countries = await Country.destroy({where: {id: countryId} })
        return countries;
    }

    async getCountryBySlug(slug: string){
        return Country.findOne({where: {slug: slug}});
    }

    async getCountryById(countryId: string) {
        return Country.findOne({where: {id: countryId} });
    }

    async patchCountry(countryFields: any) {
        console.log(JSON.stringify(countryFields))
        let country: any = await Country.findOne({where: {id: countryFields.id}});
        if(country){
            for (let i in countryFields) {
                country[i] = countryFields[i];
            }
            return await country.save()
        }
    }
}
 