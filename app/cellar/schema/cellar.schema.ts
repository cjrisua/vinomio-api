const Joi = require('joi');

export function CellarSchemaFactory ()  {
    const schemas = { 
        CreatePOST: Joi.object().keys(
                { 
                  owner: Joi.number().required(),
                  name: Joi.string().required(),
                  role: Joi.string(),
                  attributes: Joi.object()
                }) 
      };
      return schemas;
}