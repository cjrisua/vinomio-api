import { Country, dbConfig, MasterVarietal, Producer, Region, Review, Vintage, Wine } from "../../common/models"
import { WineFactory } from "../../common/models/wines.model"
import { IFilter } from "../../common/interface/filter.interface";
import Logger from "../../lib/logger";
import { QueryTypes } from "sequelize";
import { WineStatic } from "../types/wine.type";
import { ReviewFactory } from "../../common/models/reviews.model";
import { ReviewDaos } from "../../review/daos/review.daos";
import { ReviewServices } from "../../review/services/review.services";

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
        const Reviews = ReviewFactory(dbConfig)
        const review= new ReviewDaos();
        
        Logger.info(filter)
        let wines = await Wine.findAll(
            { 
                where: filter.where, 
                attributes: ['id','slug','name','color','type'] ,
                offset: page, 
                limit: limit, 
                include: [{
                 model: Producer, attributes:['id','name']
                },
                {
                 model: Region, attributes:['id','name'], include:[{
                    model:Country, as:'country', attributes:['id','name']
                 }]
                },
                {
                 model: MasterVarietal, attributes:['id','name']
                },
                {
                 model: Vintage , attributes:['id','year']
                }],
                order:[['id','DESC']]
            })
        const instance = ReviewDaos.getInstance()
        for( let wine of wines){
            await instance.reviewTotalsByWine(wine.id).then((review:any[]) => {
                const count:number = review.map(r => r.score).reduce((a:any,b:any)=> a+b,0)/review.length;
                //(<any>wine)['dataValues']['scoreAverage'] = count; 
                const result = [...review.map((m:any) => {return {'score':m.score,'vintageId':m.vintageId}}).reduce((r:Map<string,any[]>, o:any) => {
                    const key = o.vintageId;
                    const item = r.get(key) || Object.assign({}, o, {score:[]});
                    item.score.push(o.score)
                    return r.set(key,item)
                },new Map).values()];
                
                (<any>wine)['dataValues']['review'] = {average: count, scores:
                    result.map((m:any) => {
                        return { 
                            vintageId: m.vintageId,
                            min: Math.min(...m.score),
                            max: Math.max(...m.score),
                            average: m.score.reduce((a:any,b:any)=>a+b,0)/m.score.length,
                            total: m.score.length
                        }
                    })
                }
            })
        }  
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
 