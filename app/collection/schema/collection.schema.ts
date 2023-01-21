const Joi = require('joi');

export function CollectionSchemaFactory ()  {
    const schemas = { 
        CreatePOST: Joi.array().items(
            Joi.object().keys(
                { 
                  vintageId : Joi.when('wineId', {not: Joi.number().required(), then: Joi.required()}),
                  wineId : Joi.number(),
                  vintage :Joi.when('wineId', {is: Joi.number().required(), then: Joi.string().required()}),
                  statusId : Joi.string(),
                  cellarId : Joi.number().required(),
                  price :  Joi.string(),
                  purchaseNote :  Joi.string(),
                  bottleSize :  Joi.string(),
                  bottleLocation: Joi.array().items(Joi.object().keys({
                    id: Joi.string().guid({
                      version: ['uuidv4','uuidv5']
                      })
                  })),
                  acquiringSourceId: Joi.number(),
                  allocationEventId: Joi.number(),
                  bottleCount: Joi.number().required(),
                  merchant: Joi.object(),
                  purchasedOn: Joi.date().default(Date.now),
                  deliverBy: Joi.date().default(Date.now)
                })),
        GetByWinePOST: Joi.object().keys({
          cellarId : Joi.number().required(),
        }) 
      };
      return schemas;
}