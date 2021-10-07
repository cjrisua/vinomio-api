import { dbConfig, Wine } from "../../common/models"
import { WineFactory } from "../../common/models/wines.model"
import * as shortUUID from "short-uuid";
import { IFilter } from "../../common/interface/filter.interface";

export class WineDaos {

    private static Wine = WineFactory(dbConfig)
    private static instance: WineDaos;


    constructor(){}
    
    public static getInstance() {
        if (!this.instance) {
            this.instance = new WineDaos();
        }
        return this.instance;
    }

    async addWine(wineFields: any) {
        const wine = await Wine.create(wineFields);
        return wine.id;
    }

    async listWines(limit: number = 25, page: number = 0, filter: IFilter){
        const wines = await Wine.findAll({ where: filter.where, offset: page, limit: limit } )
        return wines;
    }
    
    async removeWineById(wineId: string){
        const wines = await Wine.destroy({where: {id: wineId} })
        return wines;
    }

    async getWineBySlug(slug: string){
        return Wine.findOne({where: {slug: slug}});
    }

    async getWineById(wineId: string) {
        return Wine.findOne({where: {id: wineId} });
    }

    async patchWine(wineFields: any) {
        console.log(JSON.stringify(wineFields))
        let wine: any = await Wine.findOne({where: {id: wineFields.id}});
        if(wine){
            for (let i in wineFields) {
                wine[i] = wineFields[i];
            }
            return await wine.save()
        }
    }
}
 