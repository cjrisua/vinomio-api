import { Schema } from "joi";
import express from 'express';
import Logger from "../../lib/logger";
const Joi = require('joi');


export function MerchantSchemaFactory ()  {
  const schemas = { 
    CompositeKey: Joi.object().keys(
            { 
              userId: Joi.number().required(),
              name: Joi.string().required(),
              producerId:Joi.number()
            }) 
  };
  return schemas;
}