const Joi = require('joi');

export function AllocationSchemaFactory ()  {
    const schemas = { 
        CreatePOST: Joi.object().keys(
                { 
                  events: Joi.object()
                }) 
      };
      return schemas;
}