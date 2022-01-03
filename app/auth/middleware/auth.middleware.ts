
import express from 'express';
import { AuthSchemaFactory } from '../schema/auth.schema';
import { AuthServices } from '../services/auth.services';
import { CommonMiddlewareConfig } from '../../common/common.middleware.config';
import { body, validationResult } from 'express-validator';

export class AuthMiddleware extends CommonMiddlewareConfig{
    private static instance: AuthMiddleware;

    static getInstance() {
        if (!AuthMiddleware.instance) {
            AuthMiddleware.instance = new AuthMiddleware();
        }
        return AuthMiddleware.instance;
    }
    async validateAuthSchemaLogin(req: express.Request, res: express.Response, next: express.NextFunction){
        const schema = AuthSchemaFactory().Login;
        await schema.validateAsync(req.body)
        .then(()=>{
            next();
        })
        .catch((error:any) => {
            AuthMiddleware.processValidationError(error,res);
        });
    }
}