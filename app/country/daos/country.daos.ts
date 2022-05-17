import { dbConfig, Country } from "../../common/models"
import { CountryFactory } from "../../common/models/countries.model"
import { QueryTypes } from "sequelize";

export class CountryDaos {

    private static Country = CountryFactory(dbConfig)
    private static instance: CountryDaos;


    constructor(){}
    
    public static getInstance() {
        if (!this.instance) {
            this.instance = new CountryDaos();
        }
        return this.instance;
    }
    async countryCount(){
        const query:string = 'SELECT COUNT("Countries"."id") FROM "Countries"';
        const result:any =  await dbConfig.query(query,{ raw: true,type: QueryTypes.SELECT,})
        return +result[0].count;
    }
    async addCountry(countryFields: any) {
        const country = await Country.create(countryFields);
        return country.id;
    }

    async listCountries(limit: number = 25, page: number = 0, filter:any){
        //page offser
        filter.offset = page;
        //page limit
        filter.limit = limit;
        const countries = await Country.findAll(filter)
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
 