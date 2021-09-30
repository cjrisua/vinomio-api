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
              mastervarietalId: Joi.number().required()
            }) 
  };
  return schemas;
}