import { dbConfig, Vintage, Wine } from "../../common/models"
import { VintageFactory } from "../../common/models/vintages.model"
import { IFilter } from "../../common/interface/filter.interface";
import { QueryTypes } from "sequelize";
import Logger from "../../lib/logger";

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
    async vintageCount(){
        const query:string = 'SELECT COUNT("Vintages"."id") FROM "Vintages"';
        const result:any =  await dbConfig.query(query,{ raw: true,type: QueryTypes.SELECT,})
        return +result[0].count;
    }
    async addVintage(vintageFields: any) {
        const vintage = await Vintage.create(vintageFields);
        return vintage.id;
    }

    async listVintages(limit: number = 25, page: number = 0, filter: IFilter){
        type CustomFilter = {
            [name:string] : any
        };
        const customFilter = Object.keys(filter?.where || {}).filter(i => !i.startsWith("wine__")).reduce((a:CustomFilter,b:any) =>{
            a[b]= filter?.where ? filter.where[b] : undefined
            return a
        },{})
        const vintages = await Vintage.findAll({ 
            where:customFilter,
            offset: page, 
            limit: limit,
            include:[{
                model: Wine, attributes:['id','name','slug'], where: filter.where?.wine__name ? {name:filter.where?.wine__name} : {}
            }],
        } )
        .then((res) => res)
        .catch((ex) => { Logger.error(ex); return [{error:"DAO Exception"}] })
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

    async getVintageByWineName(limit: number = 25, page: number = 0, wineName: string) {
        Logger.info("[getVintageByWineName] " + wineName)
        //return Vintage.findOne({where: {id: vintageId} });
        const query:string ='SELECT "Vintages"."id", "Vintages"."year", "Wines"."id" AS "Wine.id",  "Wines"."name" AS "Wine.name" FROM "Vintages" INNER JOIN "Wines" on "Wines"."id" = "Vintages"."wineId" WHERE "Wines"."name" iLike :name'
        const result:any =  await dbConfig.query(query,{ 
            replacements: { operator: "like", name: `%${wineName}%`},
            nest: true,
            type: QueryTypes.SELECT,
        })
        //console.debug(result)
        return result
    }

    async patchVintage(vintageFields: any) {
        let vintage: any = await Vintage.findOne({where: {id: vintageFields.id}});
        if(vintage){
            for (let i in vintageFields) {
                vintage[i] = vintageFields[i];
            }
            return await vintage.save()
        }
    }
    async removeVintageByWineSlug(vintageFields: any) {
        await Vintage.findOne({where: { wineId : vintageFields.wineId}})
    }
}
 