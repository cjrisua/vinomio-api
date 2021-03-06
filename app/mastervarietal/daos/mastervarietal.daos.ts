import { dbConfig, MasterVarietal, Variety} from "../../common/models"
import { MasterVarietalFactory } from "../../common/models/mastervarietals.model"
import * as shortUUID from "short-uuid";
import Logger from "../../lib/logger";
import { number } from "yargs";
import { IFilter } from "../../common/interface/filter.interface";
import { required } from "joi";
import { QueryTypes } from "sequelize";

export class MasterVarietalDaos {

    private  MasterVarietal = MasterVarietalFactory(dbConfig)
    private static instance: MasterVarietalDaos;


    constructor(){}
    
    public static getInstance() {
        if (!this.instance) {
            this.instance = new MasterVarietalDaos();
        }
        return this.instance;
    }
    async mastervarietalCount(){
        const query:string = 'SELECT COUNT("MasterVarietals"."id") FROM "MasterVarietals"';
        const result:any =  await dbConfig.query(query,{ raw: true,type: QueryTypes.SELECT,})
        return +result[0].count;
    }
    async addMastervarietal(masterVarietalFields: any) {
        const masterVarietal = await this.MasterVarietal.create(masterVarietalFields);
        if(masterVarietalFields.varieties){
            masterVarietalFields.varieties.forEach((varietyId: number) => {
                //Logger.debug(`add:${varietalId}`);
                const variety = masterVarietal.addVariety(varietyId);
                //Logger.debug(`add:${variety}`);
            });
        }
        return masterVarietal.id;
    }
    async removeVariety(masterVarietalFields: any){
        await MasterVarietal.findOne({where: {slug: masterVarietalFields.slug}})
            .then(p => {
                p?.removeVariety(masterVarietalFields.varietyId)
            })
        return
    }
    async listMastervarietals(limit: number = 25, page: number = 0, filter:IFilter){
        const mastervarietals = await MasterVarietal.findAll(
            {   where:filter.where, 
                offset: page, 
                limit: limit,
                order:[['id','DESC']],
                include:[
                    {
                        model:Variety, as:"varieties",
                        required:false
                    }
                ]
             } )
        return mastervarietals;
    }
    
    async removeMastervarietalById(masterVarietalId: string){
        const mastervarietals = await MasterVarietal.destroy({where: {id: masterVarietalId} })
        return mastervarietals;
    }

    async getMastervarietalBySlug(slug: string){
        return MasterVarietal.findOne({where: {slug: slug}});
    }

    async getMastervarietalById(masterVarietalId: string) {
        return MasterVarietal.findOne({where: {id: masterVarietalId} });
    }

    async patchMastervarietal(masterVarietalFields: any) {
       
        let masterVarietal: any = await MasterVarietal.findOne({where: {id: masterVarietalFields.id}});
        Logger.info(masterVarietalFields)
        if(masterVarietal){
            for (let i in masterVarietalFields) {
                if(i === 'varieties')
                    masterVarietalFields[i].forEach((p:any)=>masterVarietal.addVariety(p))
                else
                    masterVarietal[i] = masterVarietalFields[i];
            }
            return await masterVarietal.save()
        }
    }
}
 