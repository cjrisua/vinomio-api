
import express from 'express';
import { CommonMiddlewareConfig, filterByKey, filterByKeyFindAll, FilterQueryParamFactory } from '../../common/common.middleware.config';
import Logger from '../../lib/logger';
import { ProducerServices } from '../../producer/services/producer.services';
import { UserServices } from '../../user/services/user.services';
import { MerchantSchemaFactory } from '../schema/merchant.schema';
import { MerchantServices } from '../services/merchant.services';
import { MerchantQueryAttributes } from '../types/merchant.qparam';

export class MerchantMiddleware extends CommonMiddlewareConfig{
    private static instance: MerchantMiddleware;

    static getInstance() {
        if (!MerchantMiddleware.instance) {
            MerchantMiddleware.instance = new MerchantMiddleware();
        }
        return MerchantMiddleware.instance;
    }
    async validateMerchantSchema(req: express.Request, res: express.Response, next: express.NextFunction) {
        const schema = MerchantSchemaFactory().CompositeKey;
        await schema.validateAsync(req.body)
        .then(()=>{
            next();
        })
        .catch((error:any) => {
            MerchantMiddleware.processValidationError(error,res);
        });
    }
    async validateMerchantExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const merchantServices = MerchantServices.getInstance();
        if(isNaN(Number(req.params.merchantId)))
            res.status(422).send({error: `Unprocessable Merchant Id: ${req.params.merchantId}`});
        else{
            const merchant = await merchantServices.readById(req.params.merchantId);
            if (merchant) {
                next();
            } else {
                res.status(404).send({error: `Merchant ${req.params.masterVarietalId} not found`});
            }
        }
    }
    async validateUserExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const userServices = UserServices.getInstance()
        if(isNaN(Number(req.body.userId)))
            res.status(422).send({error: `Unprocessable User Id: ${req.body.userId}`});
        else{
            const user = await userServices.readById(req.body.userId);
            if (user) {
                next();
            } else {
                res.status(404).send({error: `User ${req.body.userId} not found`});
            }
        }
    }
    async validateMerchantQueryParamExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const services = MerchantServices.getInstance();
        const factory = new FilterQueryParamFactory();
        const filterConfig = factory.create(MerchantQueryAttributes);
        const filterStatement = filterByKey(req,filterConfig)
        Logger.debug(filterStatement)

        if(Object.keys(filterStatement).length == 0)
            next();
        else{
            const result = await services.list(100,0,filterStatement);
            if (result && result.length > 0) {
                next();
            } else {
                res.status(404).send({error: `Query not found`});
            }
        }
    }/*
    async validateProducerExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const producerServices = ProducerServices.getInstance()
        if(isNaN(Number(req.body.producerId)))
            next();
        else{
            const producer = await producerServices.readById(req.body.producerId);
            if (producer) {
                req.body.name = producer.name;
                next();
            } else {
                res.status(404).send({error: `Producer ${req.body.producerId} not found`});
            }
        }
    }*/
    async extractMerchantId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.merchantId;
        next();
    }
}