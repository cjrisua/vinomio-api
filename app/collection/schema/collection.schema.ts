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
                  locationId: Joi.number() ,
                  acquiringSourceId: Joi.number(),
                  allocationEventId: Joi.number(),
                  bottleCount: Joi.number().required(),
                  merchant: Joi.object()
                })) 
      };
      return schemas;
}