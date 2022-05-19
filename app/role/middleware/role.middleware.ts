
import express from 'express';
import { calculatePageInfo, filterByKey, FilterQueryParamFactory, RECORD_LIMIT } from '../../common/common.middleware.config';
import Logger from '../../lib/logger';
import { RoleServices } from '../services/role.services';
import { RoleQueryAttributes } from '../types/role.qparam';

export class RoleMiddleware {
    private static instance: RoleMiddleware;

    static getInstance() {
        if (!RoleMiddleware.instance) {
            RoleMiddleware.instance = new RoleMiddleware();
        }
        return RoleMiddleware.instance;
    }
    async validateRoleExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const roleServices = RoleServices.getInstance();
        const role = await roleServices.readById(req.params.roleId);
        if (role) {
            next();
        } else {
            res.status(404).send({error: `Role ${req.params.roleId} not found`});
        }
    }
    async extractRoleId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.roleId;
        next();
    }
    async calculatePages(req: express.Request, res: express.Response, next: express.NextFunction){
        const services = RoleServices.getInstance();
        await services.count()
            .then((count) => calculatePageInfo(count,req))
            .catch((e)=>Logger.error(e))
        next();
    }
    async validateProducerQueryParamExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const services = RoleServices.getInstance();
        const factory = new FilterQueryParamFactory();
        const filterConfig = factory.create(RoleQueryAttributes);
        const filterStatement = filterByKey(req,filterConfig)

        if(Object.keys(filterStatement).length == 0)
            next();
        else{
            const result = await services.list(RECORD_LIMIT,0,filterStatement);
            if (result && result.length > 0) {
                next();
            } else {
                res.status(404).send({error: `Role not found`});
            }
        }
    }
}