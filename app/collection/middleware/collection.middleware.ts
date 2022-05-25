
import express from 'express';
import { AllocationEventServices } from '../../allocationevent/services/allocationevent.services';
import { CommonMiddlewareConfig, filterByKey, filterByKeyFindAll, FilterQueryParamFactory, RECORD_LIMIT } from '../../common/common.middleware.config';
import Logger from '../../lib/logger';
import { VintageServices } from '../../vintage/services/vintage.services';
import { WineServices } from '../../wine/services/wine.services';
import { CollectionSchemaFactory } from '../schema/collection.schema';
import { CollectionServices } from '../services/collection.services';
import { CollectionQueryAttributes } from '../types/collection.qparam';

export class CollectionMiddleware extends CommonMiddlewareConfig{
    private static instance: CollectionMiddleware;

    static getInstance() {
        if (!CollectionMiddleware.instance) {
            CollectionMiddleware.instance = new CollectionMiddleware();
        }
        return CollectionMiddleware.instance;
    }
    async validateCollectionQueryParamExists(req: express.Request, res: express.Response, next: express.NextFunction) {       
        const collectionServices = CollectionServices.getInstance();
        const factory = new FilterQueryParamFactory();
        const filterConfig = factory.create(CollectionQueryAttributes);
        const filterStatement = filterByKey(req,filterConfig)
        const collection = await collectionServices.list(RECORD_LIMIT,0,filterStatement);
        if (collection && collection.length > 0) {
            next();
        } else {
            res.status(404).send({error: `Collection not found`});
        }
    }
    async validateCollectionPOST(req: express.Request, res: express.Response, next: express.NextFunction){
        const schema = CollectionSchemaFactory().CreatePOST;
        await schema.validateAsync(req.body)
        .then(()=>{
            next();
        })
        .catch((error:any) => {
            CollectionMiddleware.processValidationError(error,res);
        });
    }
    async validateCollectionExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const collectionServices = CollectionServices.getInstance();
        const collection = await collectionServices.readById(req.params.collectionId);
        if (collection) {
            next();
        } else {
            res.status(404).send({error: `Collection ${req.params.collectionId} not found`});
        }
    }
    async validateWineVintageExists(req: express.Request, res: express.Response, next: express.NextFunction){
        const service = WineServices.getInstance();
        const wines:any[] = req.body.filter((req:any) => Object.keys(req).some(i => i == "wineId" &&  !Object.keys(req).includes("vintageId")))
        wines.map(async (request:any,id:number)=>
        {
            await service.readById(request.wineId)
            .then(async (wine:any) => {
                const vintage:any[] = wine.Vintages.filter((i:any) => i.year == request.vintage)
                if(vintage.length > 0)
                    request.vintageId = vintage[0].id
                else{
                    const vintageService = VintageServices.getInstance();
                    const data = {year:request.vintage, wineId:request.wineId}
                    await vintageService.create(data)
                    .then((vintageid) => req.body[id].vintageId=vintageid)
                    .catch((err) => {throw new Error(err)})
                    
                }
            })
            .then(()=>{
                Logger.debug(`id:${id}`)
                if((id+1)==wines.length){
                    next();
                } 
            })
            .catch((err)=>res.status(404).send({error: `${err}`}))
        })
        //res.status(404).send({error: `set => ${wines}`})
        //const 
        /*
        wines.filter((req) => Object.keys(req).some(i => i == "wineId" &&  !Object.keys(req).includes("vintageId"))).forEach(async (request) =>{
            await service.readById(request.wineId)
            .then(async (wine:any) => {  
                const vintage:any[] = wine.Vintages.filter((i:any) => i.year == request.vintage)
                if(vintage.length > 0)
                    request.vintageId = vintage[0].id
                else{
                    const vintageService = VintageServices.getInstance();
                    const data = {year:request.vintage, wineId:request.wineId}
                    await vintageService.create(data)
                    .then((id) => request.vintageId = id)
                    .catch((err) => {throw new Error(err)})
                }
                Logger.info("request")
                Logger.info(request)
                //res.status(404).send({error: `set => ${req.body.vintageId}`})
            })
            .catch((err)=> res.status(404).send({error: `${err}`}))
            Logger.info("req.body")
            Logger.info(req.body)
        })
        Logger.info("done!")
        //next();*/
    }
    async validateAllocationExist(req: express.Request, res: express.Response, next: express.NextFunction) {
        //Logger.info(req.body[0].merchant);
        if( req.body[0].merchant?.allocationEvent?.name && 
            req.body[0].merchant?.allocationEvent?.allocationId &&
            !req.body[0].merchant?.allocationEvent?.eventId){
            //Logger.info("Add Event")
            const allocationEvent = AllocationEventServices.getInstance();
            const eventId = await allocationEvent.create({
                name:req.body[0].merchant?.allocationEvent?.name, 
                allocationId: req.body[0].merchant?.allocationEvent?.allocationId})
            //Logger.info(eventId)
            //req.body.allocationEventId = eventId;
            //Array(req.body).forEach(x => )
            req.body.forEach((x: any)  => x.allocationEventId = eventId);
        }
        next();
    }
    async extractCollectionId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.collectionId;
        next();
    }
}