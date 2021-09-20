import { dbConfig, Region } from "../../common/models"
import { RegionFactory } from "../../common/models/regions.model"
import * as shortUUID from "short-uuid";

export class RegionDaos {

    private static Region = RegionFactory(dbConfig)
    private static instance: RegionDaos;


    constructor(){}
    
    public static getInstance() {
        if (!this.instance) {
            this.instance = new RegionDaos();
        }
        return this.instance;
    }

    async addRegion(regionFields: any) {
        const region = await Region.create(regionFields);
        return region.id;
    }

    async listRegions(limit: number = 25, page: number = 0){
        const regions = await Region.findAll({ offset: page, limit: limit } )
        return regions;
    }
    
    async removeRegionById(regionId: string){
        const regions = await Region.destroy({where: {id: regionId} })
        return regions;
    }

    async getRegionBySlug(slug: string){
        return Region.findOne({where: {slug: slug}});
    }

    async getRegionById(regionId: string) {
        return Region.findOne({where: {id: regionId} });
    }

    async patchRegion(regionFields: any) {
        console.log(JSON.stringify(regionFields))
        let region: any = await Region.findOne({where: {id: regionFields.id}});
        if(region){
            for (let i in regionFields) {
                region[i] = regionFields[i];
            }
            return await region.save()
        }
    }
}
 