import express from "express";
import Logger from "../lib/logger";
import slugify from 'slugify'
import { IFilter } from "./interface/filter.interface";
import { loggers } from "winston";

export class CommonMiddlewareConfig{

    public static slugify =  (name:string) => { return slugify(name, {lower: true, remove: /[\/*+~.()'"!:@]/g})}

    public static processValidationError(error: any, res: express.Response){
        const { details } = error; 
        const message = details.map((i: { message: any; }) => i.message).join(',');
        Logger.error(`error ${message}`); 
        res.status(422).json({ error: message })
    }
    
}
export const filterByKeyFindAll = function(req: any) : IFilter{
    let filter_dic : IFilter = {}
    //Logger.info(Number(req.query['id'])? "yes":"no")
    if('id' in  req.query && (Number(req.query['id'])||req.query['id']==0))
        filter_dic.where = { id: req.query['id'] }
    else if ('slug' in  req.query)
        filter_dic.where = { slug : req.query['slug'] }
    return filter_dic
}
