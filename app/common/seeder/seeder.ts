import { dbConfig } from "../models";
import { ProducerFactory } from "../models/producers.model";
import { CountryFactory } from "../models/countries.model";
import { RegionFactory } from "../models/regions.model";
import { VarietyFactory } from "../models/varieties.model";
import { MasterVarietalFactory } from "../models/mastervarietals.model";
import { WineFactory } from "../models/wines.model";
import { VarietyBlendFactory } from "../models/varietyblend.model";


const AddProducer = function(producername:string){
    return new Promise<number>(async function(resolve, reject){
        const Producer = ProducerFactory(dbConfig);
        const producer = await Producer.create({"name":producername});
        const id:number = producer.id || 0;
        resolve(id)
    });
};
const AddWine = function(name:string, mastervarietalId:number, regionId:number, producerId:number){
    return new Promise<number>(async function(resolve, reject){
        const Wine = WineFactory(dbConfig);
        const wine = await Wine.create(
                {
                    "name":name,
                    "mastervarietalId": mastervarietalId,
                    "producerId":producerId,
                    "regionId":regionId
                }
            );
        const id:number = wine.id || 0;
        resolve(id)
    });
    
};
const DeleteAll = function(){
    return new Promise(async function (resolve, reject) {
        const Country = CountryFactory(dbConfig);
        const Region =  RegionFactory(dbConfig);
        const MasterVarietal = MasterVarietalFactory(dbConfig);
        const Variety = VarietyFactory(dbConfig);
        const VarietyBlend = VarietyBlendFactory(dbConfig);
        const Producer = ProducerFactory(dbConfig);

        MasterVarietal.destroy({where:{}});
        Variety.destroy({where:{}});
        VarietyBlend.destroy({where:{}});
        Region.destroy({where:{}});
        Country.destroy({where:{}});
        Producer.destroy({where:{}});
        resolve("done!")
    });
};
const AddCountry = function(countryname:string){
    return new Promise<number>(async function(resolve, reject){
        const Country = CountryFactory(dbConfig);
        const Region =  RegionFactory(dbConfig);
        const country = await Country.create({"name":countryname});
        const id:number = country.id || 0;
        resolve(id)
    });
};
const AddRegion = function(countryid:number, regionname:string, parentid?:number){
    return new Promise<number>(async function(resolve, reject){
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
};
const AddVariety = function(varietyname:string){
    return new Promise<number>(async function(resolve, reject){
        const Variety = VarietyFactory(dbConfig);
        const variety = await Variety.create({"name":varietyname});
        const id:number = variety.id || 0;
        resolve(id)
     });
};
const AddMasterVarietal = function(mastervarietalname:string, varieties:any){
    return new Promise<Number>(async function(resolve, reject){
        const Mastervarietal = MasterVarietalFactory(dbConfig);
        const mastervarietal = await Mastervarietal.create({"name":mastervarietalname});
        varieties.filter((f:any)=>f.name == 'Pinot Noir').map((e:any)=>{ return mastervarietal.addVariety(e.id)})
        const id:number = mastervarietal.id || 0;
        resolve(id)
    });
};
const AddVarieties =  function(){
    ['Pinot Noir','Merlot','Cabernet Sauvignon','Malbec','Cabernet Franc','Petit Verdot'].forEach((variety) =>{
        AddVariety(variety).then((id:any)=>{ setVarieties(variety,id)})
    })
}

let country:number = 0
function setCountry(x: number){
   country = x;
}
let region:number = 0
function setRegion(x: number){
    region = x;
}
let producer:number = 0
function setProducer(x: number){
    producer = x;
}
let mastervarietal:number = 0
function setMasterVarietal(x: number){
    mastervarietal = x;
}

let varieties: { name: string; id: number; }[] =[]
function setVarieties(name:string, value: number){
    varieties.push({'name':name, 'id':value})
}

async function seed(){
    await DeleteAll()
    await AddCountry("France").then((id:number)=>setCountry(id))
    await AddRegion(country,"Burgundy").then((id:number)=>setRegion(id))
    await AddRegion(country,"Côte de Nuits",region).then((id:number)=>setRegion(id))
    await AddRegion(country,"Morey-Saint-Denis",region).then((id:number)=>setRegion(id))
    await AddRegion(country,"Clos de Tart",region).then((id:number)=>setRegion(id))
    await AddVarieties()
    await AddMasterVarietal('Pinot Noir',varieties).then((id:any)=>{ setMasterVarietal(id)})
    await AddProducer("Domaine du Clos de Tart").then((id:number)=> setProducer(id));
    await AddWine("Domaine du Clos de Tart Clos de Tart", mastervarietal,region,producer);
}
seed();