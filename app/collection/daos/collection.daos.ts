import {
  dbConfig,
  Collection,
  CollectionEvent,
  Wine,
  Vintage,
  Producer,
  Region,
  MasterVarietal,
  Review,
} from "../../common/models";
import { CollectionFactory } from "../../common/models/collections.model";
import * as shortUUID from "short-uuid";
import Logger from "../../lib/logger";
import { AllocationFactory } from "../../common/models/allocations.model";
import { CollectionEventFactory } from "../../common/models/collectionevents.model";
import { CollectioneventAttributes } from "../../collectionevent/types/collectionevent.type";
import { IFilter } from "../../common/interface/filter.interface";
import { QueryTypes, Sequelize } from "sequelize";
import { number } from "joi";

export function groupBy(array: any[], key: string | number) {
  // Return the end result
  return array.reduce((result, currentValue) => {
    // If an array already present for key, push it to the array. Else create an array and push the object
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return result;
  }, {}); // empty object is the initial value for result object
}

export class CollectionDaos {
  private Collection = CollectionFactory(dbConfig);
  private static instance: CollectionDaos;

  constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new CollectionDaos();
    }
    return this.instance;
  }

  async addCollection(collectionFields: any[]) {
    const collectionEvent = CollectionEventFactory(dbConfig);
    let result: any[] = [];

    collectionFields.forEach(async (wine: any) => {
      const bottles = Array(parseInt(wine.bottleCount))
        .fill(0)
        .map((item: any, i: number) => {
          let bottle = JSON.parse(JSON.stringify(wine));
          bottle.locationId = bottle.bottleLocation[i].id;
          bottle.acquiringSourceId = bottle.merchant.id;
          return bottle;
        });

      const collection = await this.Collection.bulkCreate(bottles).then(
        async (items) => {
          //console.log(items)
          const purchasedOn = items.map((p: any) => {
            return {
              action: "PurchasedOn",
              actionDate: wine.purchasedOn,
              collectionId: p.id,
              //'locationId' : p.id
            };
          });
          await collectionEvent.bulkCreate(purchasedOn).then(async () => {
            if (
              bottles[0].statusId == "pending" ||
              bottles[0].statusId == "allocated"
            ) {
              const deliverBy = items.map((p: any) => {
                return {
                  action:
                    bottles[0].statusId == "pending"
                      ? "DeliveredBy"
                      : "DeliveredOn",
                  actionDate: wine.deliverBy,
                  collectionId: p.id,
                };
              });
              await collectionEvent.bulkCreate(deliverBy);
            }
          });
          //result.push(collection);
        }
      );
    });

    return {};
  }

  async listCollections(limit: number = 25, page: number = 0, filter: IFilter) {
    const querySelect: string = 
    `SELECT "C".*, 
     "V"."year" AS "Vintage.year",
     "W"."name" AS "Vintage.Wine.name",
     "W"."id" AS "Vintage.Wine.id",
     "W"."color" AS "Vintage.Wine.color",
     "W"."type" AS "Vintage.Wine.type",
     "P"."name" AS "Vintage.Wine.Producer.name",
     "Rg"."name" AS "Vintage.Wine.Region.name",
     "M"."name" AS "Vintage.Wine.MasterVarietal.name",
     "CE"."id" AS "CollectionEvents.id",
     "CE"."action" AS "CollectionEvents.action",
     "CE"."createdAt" AS "CollectionEvents.createdAt",
     AVG("R"."score") AS "Vintage.Review.average",
     COUNT("R"."score") AS "Vintage.Review.count"
     FROM "Collections" AS "C"
     INNER JOIN "Vintages" AS "V" on "C"."vintageId" = "V"."id"
     INNER JOIN "Wines" AS "W" on "V"."wineId" = "W"."id"
     INNER JOIN "Regions" AS "Rg" on "Rg"."id" = "W"."regionId"
     INNER JOIN "Producers" AS "P" on "P"."id" = "W"."producerId"
     INNER JOIN "MasterVarietals" AS "M" on "M"."id" = "W"."mastervarietalId"
     LEFT OUTER JOIN "Reviews" AS "R" on "R"."vintageId" = "V"."id"
     LEFT OUTER JOIN "CollectionEvents" AS "CE" on "CE"."collectionId" = "C"."id" 
     `;
    const queryGroup:string = `
    GROUP BY "C"."id",
    "C"."vintageId",
    "C"."statusId",
    "C"."cellarId",
    "C"."price",
    "C"."locationId",
    "C"."acquiringSourceId",
    "C"."allocationEventId",
    "C"."purchaseNote",
    "C"."bottleSize",
    "C"."createdAt",
    "C"."updatedAt",
    "V"."year",
    "W"."name",
    "W"."id",
    "W"."color",
    "W"."type",
    "P"."name", 
    "Rg"."name", 
    "M"."name",
    "CE"."id",
    "CE"."action",
    "CE"."createdAt"
    `
    const queryFilter: string = 'WHERE "C"."cellarId"=:cellarId';
    const queryLimit: string = "LIMIT :limit OFFSET :offset";
    const query: string = `${querySelect} ${queryFilter} ${queryGroup} ${queryLimit}`.replace(/\n/g," ");
    const result: any = await dbConfig
      .query(query.replace(/\s+/g," "), {
        replacements: {
          limit: limit,
          offset: page,
          cellarId: filter.where?.cellarId,
        },
        raw: true,
        type: QueryTypes.SELECT,
      })
      .then((resultSet: any[]) => {
        const attributes:string[]=['id','statusId','price','locationId','acquiringSourceId','allocationEventId','purchaseNote','bottleSize']
        const data =  resultSet.reduce((r:Map<string,any[]>, dataSet:any) => {
            let review:any={}
            //Object.entries(dataSet).filter(i => attributes.includes(i[0]))
            Object.keys(dataSet).filter(i => attributes.indexOf(i) != -1).map((m:string) => review[m]=dataSet[m])
            const key = dataSet.id;
            const item = r.get(key) || Object.assign({},review, {
                Vintage: {
                    id:dataSet.vintageId,
                    year:dataSet["Vintage.year"],
                    Wine:{
                        id:dataSet["Vintage.Wine.id"],
                        name:dataSet["Vintage.Wine.name"],
                        color:dataSet["Vintage.Wine.color"],
                        type: dataSet["Vintage.Wine.type"],
                        Producer:{name:dataSet["Vintage.Wine.Producer.name"]},
                        Region:{name:dataSet["Vintage.Wine.Region.name"]},
                        MasterVarietal:{name:dataSet["Vintage.Wine.MasterVarietal.name"]},
                    },
                    Review:{
                        average:dataSet["Vintage.Review.average"],
                        count:dataSet["Vintage.Review.count"]
                    }},
                CollectionEvent:[],
                });
            item.CollectionEvent.push({id:dataSet['CollectionEvents.id'],action:dataSet['CollectionEvents.action'],createdAt:dataSet['CollectionEvents.createdAt']})
            return r.set(key,item)
          },new Map)
          return [ ...data.values()]
      })
      .catch((err) => Logger.error(err));
    return result;
  }

  async removeCollectionById(collectionId: string) {
    const collections = await Collection.destroy({
      where: { id: collectionId },
    });
    return collections;
  }

  async getCollectionById(collectionId: string) {
    return Collection.findOne({ where: { id: collectionId } });
  }

  async patchCollection(collectionFields: any) {
    console.log(JSON.stringify(collectionFields));
    let collection: any = await Collection.findOne({
      where: { id: collectionFields.id },
    });
    if (collection) {
      for (let i in collectionFields) {
        collection[i] = collectionFields[i];
      }
      return await collection.save();
    }
  }
}
