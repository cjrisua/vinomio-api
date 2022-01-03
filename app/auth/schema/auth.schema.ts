import { Schema } from "joi";
import express from 'express';
import Logger from "../../lib/logger";
const Joi = require('joi');


export function AuthSchemaFactory ()  {
  const schemas = { 
    Login: Joi.object().keys(
            { 
              email: Joi.string().email().required(),
              password: Joi.string().required(),
            }) 
  };
  return schemas;
}