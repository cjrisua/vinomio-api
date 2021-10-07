import { IFilter } from "../../common/interface/filter.interface";
import { Region } from "../../common/models"

export class RegionDaos {

    //Region = RegionFactory(dbConfig)
    //private test = new 
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
        return region;
    }

    async listRegions(limit: number = 25, page: number = 0, filter: IFilter){
        const regions = await Region.findAll({ where:filter.where, offset: page, limit: limit } )
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
        console.log(Region.associations)
        return Region.findOne({where: 
            {id: regionId},
            include:{ all: true},
            attributes: {exclude: ['parentId','countryId']},//[Region.associations.parent],
        });
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
 