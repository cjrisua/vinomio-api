const Joi = require('joi');

export function CollectionSchemaFactory ()  {
    const schemas = { 
        CreatePOST: Joi.object().keys(
                { 
                  vintageId : Joi.number().required(),
                  statusId : Joi.string(),
                  cellarId : Joi.number().required(),
                  price :  Joi.string(),
                  purchaseNote :  Joi.string(),
                  bottleSize :  Joi.string(),
                  locationId: Joi.number() ,
                  acquiringSourceId: Joi.number().required(),
                  allocationEventId: Joi.number(),
                  bottleCount: Joi.number().required(),
                  merchant: Joi.object()
                }) 
      };
      return schemas;
}