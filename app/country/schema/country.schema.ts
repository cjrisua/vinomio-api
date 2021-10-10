import { Schema } from "joi";
import express from 'express';
import Logger from "../../lib/logger";
const Joi = require('joi');


export function CountrySchemaFactory ()  {
  const schemas = { 
    CreatePOST: Joi.object().keys(
            { 
              name: Joi.string().required()
            }) 
  };
  return schemas;
}