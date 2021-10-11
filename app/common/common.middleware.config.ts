import express from "express";
import Logger from "../lib/logger";
import slugify from 'slugify'
import { Filter, IFilter } from "./interface/filter.interface";
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

export const filterByKeyFindAll2 = function(req: any) : IFilter{
    let filter_dic : IFilter = {};
    return filter_dic
}


export const filterByKeyFindAll = function(req:express.Request) : IFilter{
    let filter_dic : IFilter = {}
    if(req.query.id && (Number(req.query.id) || req.query.id == '0'))
        filter_dic.where = { id: req.query.id }
    else if (req.query.slug)
        filter_dic.where = { slug: req.query.slug }

    return filter_dic
}

export const MapQParams = function <T>(obj: T) {
    const copy = {} as Filter;
    copy.where = {};
    //Logger.debug(obj)
    const asArray = Object.entries(obj);
    const filtered = asArray.filter(([key, value]) => typeof value === 'string' || typeof value === 'number' && !isNaN(value) );
    copy.where = Object.fromEntries(filtered);
    //Logger.debug(copy)
    return copy;
}
