
import express from 'express';
import { AllocationServices } from '../services/allocation.services';

export class AllocationMiddleware {
    private static instance: AllocationMiddleware;

    static getInstance() {
        if (!AllocationMiddleware.instance) {
            AllocationMiddleware.instance = new AllocationMiddleware();
        }
        return AllocationMiddleware.instance;
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