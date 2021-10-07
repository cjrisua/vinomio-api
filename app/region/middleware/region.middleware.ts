
import express from 'express';
import { CommonMiddlewareConfig, filterByKeyFindAll } from '../../common/common.middleware.config';
import { RegionSchemaFactory } from '../schema/region.schema';
import { RegionServices } from '../services/region.services';

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
    async validateRegionQueryParamExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const regionServices = RegionServices.getInstance();
        const filterStatement = filterByKeyFindAll(req)
        const region = await regionServices.list(100,0,filterStatement);
        if (region && region.length > 0) {
            next();
        } else {
            res.status(404).send({error: `Region not found`});
        }
    }
}