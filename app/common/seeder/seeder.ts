//import { Producer } from "../models";
import { dbConfig } from "../models";
import { ProducerFactory } from "../models/producers.model";
import { ProducerAttributes } from "../../producer/types/producer.type";
import { ProducerServices } from "../../producer/services/producer.services";
import { CountryFactory } from "../models/countries.model";
import { RegionFactory } from "../models/regions.model";
import { number } from "yargs";
import { Region } from "../../region/types/region.type";
import { VarietyFactory } from "../models/varieties.model";
import { MasterVarietalFactory } from "../models/mastervarietals.model";
import { WineFactory } from "../models/wines.model";
import { VarietyBlendFactory } from "../models/varietyblend.model";


const producer = new Promise(async function(resolve, reject){
    const Producer = ProducerFactory(dbConfig);
    const producers = await Producer.create({"name":"Domaine du Clos de Tart"});
    resolve(producers.id)
});

const wine = function(mastervarietalId:number, regionId:number, producerId:number){
    return new Promise(async function(resolve, reject){
        const Wine = WineFactory(dbConfig);
        const producers = await Wine.create(
                {
                    "name":"Domaine du Clos de Tart Clos de Tart",
                    "mastervarietalId": mastervarietalId,
                    "producerId":producerId,
                    "regionId":regionId
                }
            );
        resolve(producers.id)
    });
    
}

const deleteAll = function(){
    return new Promise(async function (resolve, reject) {
        const Country = CountryFactory(dbConfig);
        const Region =  RegionFactory(dbConfig);
        const MasterVarietal = MasterVarietalFactory(dbConfig);
        const Variety = VarietyFactory(dbConfig);
        const VarietyBlend = VarietyBlendFactory(dbConfig)

        MasterVarietal.destroy({where:{}});
        Variety.destroy({where:{}});
        VarietyBlend.destroy({where:{}});
        
        Region.destroy({where:{}});
        Country.destroy({where:{}});

        resolve("done!")
    });
};

const country = new Promise(async function(resolve, reject){
    const Country = CountryFactory(dbConfig);
    const Region =  RegionFactory(dbConfig);
    const country = await Country.create({"name":"France"});
    const id:number = country.id || 0;
    resolve(id)
});

const addRegion = function(countryid:number, regionname:string, parentid?:number){
    return new Promise(async function(resolve, reject){
        const Region = RegionFactory(dbConfig);
        let region:any = undefined;
        //console.log(`parentid = ${parentid}`);
        if(parentid == undefined)
            region = await Region.create({"name":regionname, "countryId": countryid});
        else
            region = await Region.create({"name":regionname, "countryId": countryid, "parentId":parentid});
        //console.log(`From Promise: ${region.id}`);
        resolve(region.id)
    });
}

const variety = new Promise(async function(resolve, reject){
    const Variety = VarietyFactory(dbConfig);
    const variety = await Variety.create({"name":"Pinot Noir"});
    const id:number = variety.id || 0;
    resolve(id)
});
const addMasterVarietal = function(varieties:any){
    return new Promise(async function(resolve, reject){
        const Mastervarietal = MasterVarietalFactory(dbConfig);
        const mastervarietal = await Mastervarietal.create({"name":"Pinot Noir","varieties":varieties});
        varieties.forEach((element:number) => {
            mastervarietal.addVariety(element);
        });
        const id:number = mastervarietal.id || 0;
        resolve(id)
    });
};

deleteAll().then((result)=>{

    variety.then((result:any)=>{
        let varieties = []
        varieties.push(result);
        addMasterVarietal(varieties)
    });

    country.then((result:any)=>{
        const countryid:number = result || 0;
        addRegion(countryid,"Burgundy")
        .then((result:any)=>{
        const regionid:number = result;
        addRegion(countryid,"Côte de Nuits",regionid)
        .then((parentid:any)=>{
                addRegion(countryid,"Morey-Saint-Denis",parentid)
                .then((parentid:any)=>{
                    addRegion(countryid,"Clos de Tart",parentid)
                });
            })
        }) 
    })

    producer.then((result:any)=>{

    })
});