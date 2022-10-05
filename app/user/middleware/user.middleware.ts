
import express from 'express';
import { body, validationResult } from 'express-validator';
import { UserServices } from '../services/user.services';
import bcrypt from "bcrypt"
import { UserSchemaFactory } from '../schema/user.schema';
import { CommonMiddlewareConfig } from '../../common/common.middleware.config';

export class UserMiddleware extends CommonMiddlewareConfig {
    private static instance: UserMiddleware;

    static getInstance() {
        if (!UserMiddleware.instance) {
            UserMiddleware.instance = new UserMiddleware();
        }
        return UserMiddleware.instance;
    }
    async validateUserProfileSchema(req: express.Request, res: express.Response, next: express.NextFunction) {
        const schema = UserSchemaFactory().email;
        await schema.validateAsync(req.body)
        .then(()=>{
            next();
        })
        .catch((error:any) => {
            UserMiddleware.processValidationError(error,res);
        });
    }
    async validateUserExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const userServices = UserServices.getInstance();
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else
        {
            const user = await userServices.readById(req.params.userId);
            if (user) {
                next();
            } else {
                res.status(404).send({error: `User ${req.params.userId} not found`});
            }
        }
    }
    async validateUserRegister(req: express.Request, res: express.Response, next: express.NextFunction){
        const userServices = UserServices.getInstance();

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else
        {
            const user = await userServices.readByEmail(req.body.email);
            if (user) {
                res.status(404).send({error: `User ${req.body.email}  found`});
            } else {
                next();
            }
        }
    }
    async extractUserId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.userId;
        next();
    }
    async EncryptUserPwd(req: express.Request, res: express.Response, next: express.NextFunction) {
        bcrypt.hash(req.body.password, 10).then(pwd => req.body.password = pwd);
        next();
    }
}