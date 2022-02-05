
import express from 'express';
import { RoleServices } from '../services/role.services';

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
}