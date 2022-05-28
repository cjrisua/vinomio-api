const Joi = require('joi');

export function AllocationEventOfferSchemaFactory ()  {
    const schemas = { 
        CreatePOST: Joi.array().items(
                Joi.object().keys(
                { 
                  allocationEventId: Joi.number().required(),
                  wineId: Joi.number().required(),
                  releasePrice: Joi.number().required(),
                  minimum:Joi.number()
                }))
      };
      return schemas;
}