const Joi = require('joi');

export function AllocationSchemaFactory ()  {
    const schemas = { 
        CreatePOST: Joi.object().keys(
                { 
                  outlook: Joi.number(),
                  events: Joi.object()
                }) 
      };
      return schemas;
}