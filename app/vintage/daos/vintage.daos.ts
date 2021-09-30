import { dbConfig, Vintage } from "../../common/models"
import { VintageFactory } from "../../common/models/vintages.model"
import * as shortUUID from "short-uuid";

export class VintageDaos {

    private static Vintage = VintageFactory(dbConfig)
    private static instance: VintageDaos;


    constructor(){}
    
    public static getInstance() {
        if (!this.instance) {
            this.instance = new VintageDaos();
        }
        return this.instance;
    }

    async addVintage(vintageFields: any) {
        const vintage = await Vintage.create(vintageFields);
        return vintage.id;
    }

    async listVintages(limit: number = 25, page: number = 0){
        const vintages = await Vintage.findAll({ offset: page, limit: limit } )
        return vintages;
    }
    
    async removeVintageById(vintageId: string){
        const vintages = await Vintage.destroy({where: {id: vintageId} })
        return vintages;
    }

    async getVintageByYear(year: number){
        return Vintage.findOne({where: {year: year}});
    }

    async getVintageById(vintageId: string) {
        return Vintage.findOne({where: {id: vintageId} });
    }

    async patchVintage(vintageFields: any) {
        console.log(JSON.stringify(vintageFields))
        let vintage: any = await Vintage.findOne({where: {id: vintageFields.id}});
        if(vintage){
            for (let i in vintageFields) {
                vintage[i] = vintageFields[i];
            }
            return await vintage.save()
        }
    }
}
 