import { Schema } from "joi";
import express from 'express';
import Logger from "../../lib/logger";
const Joi = require('joi');


export function RegionSchemaFactory ()  {
  const schemas = { 
    CreatePOST: Joi.object().keys(
            { 
              name: Joi.string().required(),
              countryId: Joi.number().required(),
              parentId: Joi.number().optional()
            }) 
  };
  return schemas;
}