
import { debug } from 'console';
import express from 'express';
import { calculatePageInfo, CommonMiddlewareConfig, filterByKey, FilterQueryParamFactory, RECORD_LIMIT } from '../../common/common.middleware.config';
import { IFilter } from '../../common/interface/filter.interface';
import Logger from '../../lib/logger';
import { WineServices } from '../../wine/services/wine.services';
import { WineSchemaFactory } from '../schema/wine.schema';
import { VintageServices } from '../services/vintage.services';
import { VintageQueryAttributes } from '../types/vintage.qparam';


export class VintageMiddleware extends CommonMiddlewareConfig {
    private static instance: VintageMiddleware;

    static getInstance() {
        if (!VintageMiddleware.instance) {
            VintageMiddleware.instance = new VintageMiddleware();
        }
        return VintageMiddleware.instance;
    }
    async validateWinePOST(req: express.Request, res: express.Response, next: express.NextFunction){
        const schema = WineSchemaFactory().CreatePOST;
        await schema.validateAsync(req.body)
        .then(()=>{
            next();
        })
        .catch((error:any) => {
            VintageMiddleware.processValidationError(error,res);
        });
    }
    async validateVintageExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const vintageServices = VintageServices.getInstance();
        if(isNaN(Number(req.params.vintageId)))
            res.status(422).send({error: `Unprocessable Vintage Id: ${req.params.vintageId}`});
        else{
            const vintage = await vintageServices.readById(req.params.vintageId);
            if (vintage) {
                next();
            } else {
                res.status(404).send({error: `Vintage ${req.params.vintageId} not found`});
            }
        }
    }
    async extractVintageId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.vintageId;
        next();
    }
    async validateVintageQueryParamExists(req: express.Request, res: express.Response, next: express.NextFunction) {
    
        const vintageServices = VintageServices.getInstance();
        const factory = new FilterQueryParamFactory();
        const filterConfig = factory.create(VintageQueryAttributes);
        const filterStatement = filterByKey(req,filterConfig)
        //const filter:Filter = VintageQParameterFilter(req)

        //Logger.debug(`validateVintageQueryParamExists: ${filterStatement}`)
        Logger.debug(filterStatement)
        //Logger.debug(Object.keys(filterStatement).length)

        if(Object.keys(filterStatement).length == 0)
            next();
        else{
            const vintage = await vintageServices.list(RECORD_LIMIT,0,filterStatement);
            if (vintage && vintage.length > 0) {
                next();
            } else {
                res.status(404).send({error: `Vintage not found`});
            }
        }
    }
    async validateVintageIsUnique(req: express.Request, res: express.Response, next: express.NextFunction) {
        const vintageServices = VintageServices.getInstance();
        const filter  = { where: {wineId: req.body.wineId, year:req.body.year}}
        const vinatge = await vintageServices.list(1,0,filter);
        if (vinatge && vinatge.length > 0)
            res.status(409).send({error: `Vintage ${req.body.name} exists`});
        else
            next();
    }
    async calculatePages(req: express.Request, res: express.Response, next: express.NextFunction){
        const services = VintageServices.getInstance();
        await services.count()
            .then((count) => calculatePageInfo(count,req))
            .catch((e)=>Logger.error(e))
        next();
    }
    async validateWineVintageCombo(req: express.Request, res: express.Response, next: express.NextFunction) {
        const service = VintageServices.getInstance();
        const wineService = WineServices.getInstance();

        const wine = await wineService.readBySlug(req.params.slug)
            .then((data:any) => {
                if(data)
                    req.body.wineId = data.id
                else
                    res.status(404).send({error: `Wine ${req.params.slug} not found`});
            })
            .then(async ()=>{
                Logger.info(`? ${req.body.wineId}`)
                const filter : IFilter = { where: {wineId: req.body.wineId}}
                const response = await service.list(1,0,filter);
                if(response.some(p => p.id.toString() === req.params.vintageId))
                    res.status(404).send({error: `  found for ${req.params.slug}`});  
                else
                    res.status(404).send({error: ` not found for ${req.params.slug}`});           
            })
        //const filter : IFilter = { where: {slug: req.params.slug}}
        //const response = await service.list(1,0,filter);
        //if(response.length != 0){
        //    const variety = response[0].varieties.filter((i:any) => i.id == req.params.varietyId);
        //    if(variety.length != 0)
        //        next();
        //    else
        //    res.status(404).send({error: `Variety id ${req.params.varietyId} not found for ${req.params.slug}`});
        //}
        //else
        //    res.status(404).send({error: `MasterVarietal ${req.params.slug} not found`});
        //next()
    }
}