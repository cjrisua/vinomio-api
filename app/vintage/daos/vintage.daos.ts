import { dbConfig, Vintage, Wine } from "../../common/models"
import { VintageFactory } from "../../common/models/vintages.model"
import { IFilter } from "../../common/interface/filter.interface";
import { QueryTypes } from "sequelize";

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
        const vintages = await Vintage.findAll({ 
            where:filter.where, 
            offset: page, 
            limit: limit,
            include:[{
                model: Wine, attributes:['id','name','slug']
            }],
            
        } )
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
 