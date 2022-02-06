
import express from 'express';
import { CommonMiddlewareConfig } from '../../common/common.middleware.config';
import Logger from '../../lib/logger';
import { RoleServices } from '../../role/services/role.services';
import { CellarSchemaFactory } from '../schema/cellar.schema';
import { CellarServices } from '../services/cellar.services';

export class CellarMiddleware extends CommonMiddlewareConfig {
    private static instance: CellarMiddleware;

    static getInstance() {
        if (!CellarMiddleware.instance) {
            CellarMiddleware.instance = new CellarMiddleware();
        }
        return CellarMiddleware.instance;
    }
    async validateCellarPOST(req: express.Request, res: express.Response, next: express.NextFunction){
        const schema = CellarSchemaFactory().CreatePOST;
        await schema.validateAsync(req.body)
        .then(()=>{
            next();
        })
        .catch((error:any) => {
            CellarMiddleware.processValidationError(error,res);
        });
    }
    async validateCellarExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const cellarServices = CellarServices.getInstance();
        const cellar = await cellarServices.readById(req.params.cellarId);
        if (cellar) {
            next();
        } else {
            res.status(404).send({error: `Cellar ${req.params.cellarId} not found`});
        }
    }
    async extractCellarId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.cellarId;
        next();
    }
    async extractRoleId(req: express.Request, res: express.Response, next: express.NextFunction) {
        console.log(req.body)
        const cellarServices  = RoleServices.getInstance()
        if(req.body.role){
            const roles = await cellarServices.list(100,0).then((r) => { 
                    return r.filter( item => item.name == req.body.role)});
            if(roles.length >0){
                req.body.role = roles[0].id
                next()
            }
            else{
                const msg = `Role ${req.body.role} not found`;
                console.log(msg)
                res.status(404).send({error: msg});
            }
        }
        else
            next()
    }
}