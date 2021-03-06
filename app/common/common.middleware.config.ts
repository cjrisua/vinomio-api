import express from "express";
import Logger from "../lib/logger";
import slugify from 'slugify'
import { Filter, IFilter } from "./interface/filter.interface";
import { loggers } from "winston";
import { Op } from "sequelize"


export class FilterQueryParamFactory {
    create<T>(type: (new () => T)): T {
        return new type();
    }
}

export const RECORD_LIMIT = 100

export class CommonMiddlewareConfig{

    public static slugify =  (name:string) => { return slugify(name, {lower: true, remove: /[\/*+~.()'"!:@]/g})}

    public static processValidationError(error: any, res: express.Response){
        const { details } = error; 
        const message = details.map((i: { message: any; }) => i.message).join(',');
        Logger.error(`error ${message}`); 
        res.status(422).json({ error: message })
    }
    
}

export const calculatePageInfo = function(count: number, req: express.Request){
    const page:number = req.query?.page && Number.isInteger(+req.query.page) ? Math.abs(+req.query.page) : 1
    const pages = Math.ceil(count / RECORD_LIMIT);
    const offset =  RECORD_LIMIT * (page - 1);
    req.body.count=count
    req.body.pages=pages
    req.body.offset=offset
}

export const filterByKeyFindAll2 = function(req: any) : IFilter{
    let filter_dic : IFilter = {};
    return filter_dic
}



export const filterByKey = function<T>(req:express.Request, filter_attributes:T) : IFilter{

    let filter_dic : IFilter = {}

    if(req.query.id && (Number(req.query.id) || req.query.id == '0'))
        filter_dic.where = { id: req.query.id }
    else if (req.query.slug)
        filter_dic.where = { slug: req.query.slug }
    
    Object.keys(filter_attributes)
        .map((p) =>{ 
            if(!filter_dic.where) filter_dic.where = {}

            //operator
            //const regex = `^${p}__(like|ilike)`
            const regexp = new RegExp(`^(${p})__(like|iLike)`);
            const match = Object.keys(req.query).filter(param => regexp.test(param))
            if(match.length>0){
                
                //filter_dic.where = {}

                //Logger.debug(`p: ${p}`)
                //Logger.debug(`match: ${match}`)
                const results = regexp.exec(match[0]) || []
                //Logger.debug(results)

                //if(!filter_dic.where) Logger.debug(filter_dic.where)
                //else Logger.debug(filter_dic.where)
                let operation = {}
                switch(results[2]){
                    case 'like':
                        operation = { [Op.like]:  "%" + req.query![match[0]] +"%"} 
                        break;
                    case 'iLike':
                         operation = { [Op.iLike]: "%" + req.query![match[0]]  +"%"} 
                        break;
                }
                //set filter operator
                filter_dic.where![p] = operation
                //Logger.debug(filter_dic)
            }
            else{
                if(req.query![p] != undefined){
                    if(filter_dic.where == undefined)
                        filter_dic.where = {}
                    filter_dic.where![p] = req.query![p];
                } 
            }   
        });
    //const test = {[Op.iLike]:'%sh%'}
    //filter
    req.body.filter = filter_dic
    Logger.debug(filter_attributes)
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
