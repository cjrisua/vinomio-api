import { dbConfig, MasterVarietal} from "../../common/models"
import { MasterVarietalFactory } from "../../common/models/mastervarietals.model"
import * as shortUUID from "short-uuid";
import Logger from "../../lib/logger";
import { number } from "yargs";

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

    async listMastervarietals(limit: number = 25, page: number = 0){
        const mastervarietals = await MasterVarietal.findAll({ offset: page, limit: limit } )
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
        console.log(JSON.stringify(masterVarietalFields))
        let masterVarietal: any = await MasterVarietal.findOne({where: {id: masterVarietalFields.id}});
        if(masterVarietal){
            for (let i in masterVarietalFields) {
                masterVarietal[i] = masterVarietalFields[i];
            }
            return await masterVarietal.save()
        }
    }
}
 