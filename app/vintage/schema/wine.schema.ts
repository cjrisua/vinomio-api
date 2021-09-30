import { Schema } from "joi";
import express from 'express';
import Logger from "../../lib/logger";
const Joi = require('joi');


export function WineSchemaFactory ()  {
  const schemas = { 
    CreatePOST: Joi.object().keys(
            { 
              year: Joi.number().required(),
              wineId: Joi.number().required()
            }) 
  };
  return schemas;
}