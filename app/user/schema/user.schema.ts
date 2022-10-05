import { Schema } from "joi";
import express from 'express';
import Logger from "../../lib/logger";
const Joi = require('joi');


export function UserSchemaFactory ()  {
  const schemas = { 
    email: Joi.object().keys(
            { 
              email: Joi.string().email().required()
            }) 
  };
  return schemas;
}