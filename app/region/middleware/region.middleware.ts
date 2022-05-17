
import express from 'express';
import { calculatePageInfo, CommonMiddlewareConfig, filterByKey, FilterQueryParamFactory, RECORD_LIMIT } from '../../common/common.middleware.config';
import { IFilter } from '../../common/interface/filter.interface';
import Logger from '../../lib/logger';
import { RegionSchemaFactory } from '../schema/region.schema';
import { RegionServices } from '../services/region.services';
import { RegionQueryAttributes } from '../types/region.qparam';

export class RegionMiddleware extends CommonMiddlewareConfig {
    private static instance: RegionMiddleware;

    static getInstance() {
        if (!RegionMiddleware.instance) {
            RegionMiddleware.instance = new RegionMiddleware();
        }
        return RegionMiddleware.instance;
    }
    async validateRegionPOST(req: express.Request, res: express.Response, next: express.NextFunction){
        const schema = RegionSchemaFactory().CreatePOST;
        await schema.validateAsync(req.body)
        .then(()=>{
            next();
        })
        .catch((error:any) => {
            RegionMiddleware.processValidationError(error,res);
        });
    }
    async validateRegionIsUnique(req: express.Request, res: express.Response, next: express.NextFunction) {
        const regionServices = RegionServices.getInstance();
        const filter : IFilter = { where: {slug: RegionMiddleware.slugify(req.body.name)}}
        const region = await regionServices.list(1,0,filter);
        if (region && region.length > 0)
            res.status(409).send({error: `Region ${req.body.name} exists`});
        else
            next();
    }
    async validateRegionExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const regionServices = RegionServices.getInstance();
        if(isNaN(Number(req.params.regionId)))
            res.status(422).send({error: `Unprocessable Region Id: ${req.params.regionId}`});
        else{
            const region = await regionServices.readById(req.params.regionId);
            if (region) {
                next();
            } else {
                res.status(404).send({error: `Region ${req.params.regionId} not found`});
            }
        }
    }
    async extractRegionId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.regionId;
        next();
    }
    async calculatePages(req: express.Request, res: express.Response, next: express.NextFunction){
        const services = RegionServices.getInstance();
        await services.count()
            .then((count) => calculatePageInfo(count,req))
            .catch((e)=>Logger.error(e))
        next();
    }
    async validateRegionQueryParamExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        
        const factory = new FilterQueryParamFactory();
        const filterConfig = factory.create(RegionQueryAttributes);
        const regionServices = RegionServices.getInstance();
        const filterStatement = filterByKey(req,filterConfig)
        console.log(filterStatement)

        //let region:any

        //if(req.query.includeparent && req.query.includeparent == 'true')
        //    region  = await regionServices.customList(RECORD_LIMIT,0,filterStatement);
        //else
        const region  = await regionServices.list(RECORD_LIMIT,0,filterStatement);

        if (region && region.length > 0) {
            next();
        } else {
            res.status(404).send({error: `Region not found`});
        }
    }
}