import { Schema } from "joi";
import express from 'express';
import Logger from "../../lib/logger";
const Joi = require('joi');


export function PeopleSchemaFactory ()  {
  const schemas = { 
    AddPeople: Joi.object().keys(
            { 
              name: Joi.string().required(),
              role: Joi.string().required(),
              handler: Joi.string()
            }) 
    
  };
  return schemas;
}