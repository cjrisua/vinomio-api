import * as sequelize from "sequelize";
import { QueryTypes } from "sequelize";
import { IFilter } from "../../common/interface/filter.interface";
import { dbConfig, Region } from "../../common/models";
import { RegionModel } from "../types/region.type";

export class RegionDaos {
  //Region = RegionFactory(dbConfig)
  //private test = new
  private static instance: RegionDaos;

  private _terroirs:any =[];

  constructor() {}

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
  private async MapValue(value:string){
   this._terroirs.push({terroir:value})
  }
  private async ProcessRegion(id: number) : Promise<string>{
    const region_query: string = `WITH RECURSIVE c AS (\
        SELECT "Regions"."id", \
                "Regions"."parentId", \
               "Regions"."name", \
               0 AS level \
        FROM "Regions" \
        where "Regions"."id" = :id \
        UNION ALL \
        SELECT "t"."id", \
                "t"."parentId", \
                "t"."name", \
                "c".level + 1 AS level \
        FROM "Regions" AS "t" \
        INNER JOIN "c" on "c"."parentId" = "t"."id") \
    SELECT  STRING_AGG( "c"."name",' > ' ORDER BY level ASC) as "region" from "c"`;
    
    const r:any =  await dbConfig.query(region_query, {
      replacements: { id: id },
      raw: true,
      type: QueryTypes.SELECT,
    }).then((m:any) =>  m[0].region)
    
    return r 
  }
  async listRegions(limit: number = 25, page: number = 0, filter: IFilter) {
    console.log(filter)
    const regions = await Region.findAll({
      where: filter.where,
      offset: page,
      include: { all: true },
      limit: limit,
    });
    return regions;
  }
  async listRegionsWithParent(
    limit: number = 25,
    page: number = 0,
    filter: IFilter
  ) {
    const regions = await Region.findAll({
      where: filter.where,
      offset: page,
      include: { all: true },
      limit: limit,
    }).then(async (regions) => { 
        for(let i=0;i<regions.length;i++){
           const terroir =  await this.ProcessRegion(regions[i].id)
           regions[i].terroir = terroir
        }
        return regions
    })

    /*
    let newregion:Region = []

    regions.forEach(async (m) => {
        await this.ProcessRegion(m.id)
        .then((r)=> {
            m.setDataValue('terroir','hello')
            console.log(m.terroir)
        })
    })*/
  
    return regions;
  }

  async removeRegionById(regionId: string) {
    const regions = await Region.destroy({ where: { id: regionId } });
    return regions;
  }

  async getRegionBySlug(slug: string) {
    return Region.findOne({ where: { slug: slug } });
  }

  async getRegionById(regionId: string) {
    //console.log(Region.associations)
    return Region.findOne({
      where: { id: regionId },
      include: { all: true },
      attributes: { exclude: ["parentId", "countryId"] }, //[Region.associations.parent],
    });
  }

  async patchRegion(regionFields: any) {
    console.log(JSON.stringify(regionFields));
    let region: any = await Region.findOne({ where: { id: regionFields.id } });
    if (region) {
      for (let i in regionFields) {
        region[i] = regionFields[i];
      }
      return await region.save();
    }
  }
}
