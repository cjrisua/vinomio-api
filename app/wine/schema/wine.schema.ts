import { Schema } from "joi";
import express from 'express';
import Logger from "../../lib/logger";
const Joi = require('joi');


export function WineSchemaFactory ()  {
  const schemas = { 
    CreatePOST: Joi.object().keys(
            { 
              name: Joi.string().required(),
              producerId: Joi.number().required(),
              mastervarietalId: Joi.number().required(),
              regionId: Joi.number().required(),
              color: Joi.string().valid('Red','White','Rose'),
              type: Joi.string().valid('Red','White','Rose','Sparkling','Dessert','Fortified'),
            }) 
  };
  return schemas;
}