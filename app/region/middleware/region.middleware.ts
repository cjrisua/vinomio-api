
import express from 'express';
import { CommonMiddlewareConfig } from '../../common/common.middleware.config';
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
        const region = await regionServices.readById(req.params.regionId);
        if (region) {
            next();
        } else {
            res.status(404).send({error: `Region ${req.params.regionId} not found`});
        }
    }
    async extractRegionId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.regionId;
        next();
    }
}