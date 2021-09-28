import { Schema } from "joi";
import express from 'express';
import Logger from "../../lib/logger";
const Joi = require('joi');


export function MasterVarietalSchemaFactory ()  {
  const schemas = { 
    CreatePOST: Joi.object().keys(
            { 
              name: Joi.string().required(),
              varieties: Joi.array().items(Joi.number()).required()
            }) 
  };
  return schemas;
}

export class MasterVarietalSchema{

  /*
    private static instance: MasterVarietalSchema;

    static getInstance() {
        if (!MasterVarietalSchema.instance) {
            MasterVarietalSchema.instance = new MasterVarietalSchema();
        }
        return MasterVarietalSchema.instance;
    }
    async POST(request: express.Express){
      const { error } = Joi.validate(request, schema); 
      Logger.debug(request);
      
    }
    /*const schemas = { 
        mastervarietyPOST: Joi.object().keys({ 
          title: Joi.string().required,
          description: Joi.string().required() 
        }) 
        // define all the other schemas below 
      };
      */ 
     
};