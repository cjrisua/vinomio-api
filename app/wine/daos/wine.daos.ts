import { dbConfig, MasterVarietal, Producer, Region, Vintage, Wine } from "../../common/models"
import { WineFactory } from "../../common/models/wines.model"
import { IFilter } from "../../common/interface/filter.interface";
import Logger from "../../lib/logger";
import { QueryTypes } from "sequelize";
import { WineStatic } from "../types/wine.type";

export class WineDaos {

    private static Wine = WineFactory(dbConfig)
    private static instance: WineDaos;
    //private static LIMIT:number = 1;

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
    async wineCount(){
        const query:string = 'SELECT COUNT("Wines"."id") FROM "Wines"';
        const result:any =  await dbConfig.query(query,{ raw: true,type: QueryTypes.SELECT,})
        return +result[0].count;
    }
    async listWines(limit: number = 25, page: number = 0, filter: IFilter){
        //Logger.info(page)
        const wines = await Wine.findAll(
            { 
                where: filter.where, 
                attributes: ['id','slug','name'] ,
                offset: page, 
                limit: limit, 
                include: [{
                 model: Producer, attributes:['id','name']
                },
                {
                 model: Region, attributes:['id','name']
                },
                {
                 model: MasterVarietal, attributes:['id','name']
                },
                {
                 model: Vintage , attributes:['id','year']
                }],
                order:[['id','DESC']]
            } )
        return wines;
    }
    
    async removeWineById(wineId: string){
        const wines = await Wine.destroy(
            {
                where: {id: wineId}
            }).catch((ex) => {Logger.error(ex); return {}})
        return wines;
    }

    async getWineBySlug(slug: string){
        return Wine.findOne({where: {slug: slug}});
    }

    async getWineById(wineId: string) {
        return Wine.findOne({
            where: {id: wineId},
            include:[{model: Vintage , attributes:['id','year']}]
        });
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
 