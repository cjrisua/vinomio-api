const Joi = require('joi');

export function CellarSchemaFactory ()  {
    const schemas = { 
        CreatePOST: Joi.object().keys(
                { 
                  owner: Joi.number().required(),
                  role: Joi.number(),
                  attributes: Joi.string().required()
                }) 
      };
      return schemas;
}