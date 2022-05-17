
import express from 'express';
import { filterByKey, FilterQueryParamFactory, RECORD_LIMIT } from '../../common/common.middleware.config';
import Logger from '../../lib/logger';
import { AllocationServices } from '../services/allocation.services';
import { AllocationQueryAttributes } from '../types/allocation.qparam';

export class AllocationMiddleware {
    private static instance: AllocationMiddleware;

    static getInstance() {
        if (!AllocationMiddleware.instance) {
            AllocationMiddleware.instance = new AllocationMiddleware();
        }
        return AllocationMiddleware.instance;
    }
    async validateAllocationParamExists(req: express.Request, res: express.Response, next: express.NextFunction) {       
        const services = AllocationServices.getInstance();
        const factory = new FilterQueryParamFactory();
        const filterConfig = factory.create(AllocationQueryAttributes);
        const filterStatement = filterByKey(req,filterConfig)
        const collection = await services.list(RECORD_LIMIT,0,filterStatement);
        if (collection && collection.length > 0) {
            next();
        } else {
            res.status(404).send({error: `Allocation not found`});
        }
    }
    async validateAllocationExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const allocationServices = AllocationServices.getInstance();
        const allocation = await allocationServices.readById(req.params.allocationId);
        if (allocation) {
            next();
        } else {
            res.status(404).send({error: `Allocation ${req.params.allocationId} not found`});
        }
    }
    async extractAllocationId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.allocationId;
        next();
    }
}