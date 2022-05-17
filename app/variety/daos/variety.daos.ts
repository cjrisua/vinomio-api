import { dbConfig, Variety } from "../../common/models"
import { IFilter } from "../../common/interface/filter.interface";
import { QueryTypes } from "sequelize";

export class VarietyDaos {

    //private static Variety = VarietyFactory(dbConfig)
    private static instance: VarietyDaos;


    constructor(){}
    
    public static getInstance() {
        if (!this.instance) {
            this.instance = new VarietyDaos();
        }
        return this.instance;
    }
    async varietyCount(){
        const query:string = 'SELECT COUNT("Varieties"."id") FROM "Varieties"';
        const result:any =  await dbConfig.query(query,{ raw: true,type: QueryTypes.SELECT,})
        return +result[0].count;
    }
    async addVariety(varietyFields: any) {
        return await Variety.create(varietyFields)
        .then((v)=>{return v.id})
        .catch(()=>{})
        //return variety.id;
    }

    async listVarieties(limit: number = 25, page: number = 0, filter: IFilter){
        return await Variety.findAll({ where: filter.where, offset: page, limit: limit,
            order:[['id','DESC']] } )
    }
    
    async removeVarietyById(varietalId: string){
        return await Variety.destroy({where: {id: varietalId} })
    }

    async getVarietyBySlug(slug: string){
        return await Variety.findOne({where: {slug: slug}});
    }

    async getVarietyById(varietyId: string) {
        return await Variety.findOne({where: {id: varietyId} });
    }

    async patchVariety(varietyFields: any) {
        //console.log(JSON.stringify(varietyFields))
        let variety: any = await Variety.findOne({where: {id: varietyFields.id}});
        if(variety){
            for (let i in varietyFields) {
                variety[i] = varietyFields[i];
            }
            return await variety.save()
        }
    }
}
 