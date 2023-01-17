import { Schema } from "joi";
import express from "express";
import Logger from "../../lib/logger";
const Joi = require("joi");

export function ReviewSchemaFactory() {
  const schemas = {
    AddOrUpdatePOST: Joi.object().keys({
      id: Joi.number(),
      vintageId: Joi.number().required(),
      publisherId: Joi.number().required(),
      review: Joi.string().required(),
      score: Joi.number(),
      tags: Joi.array().items(
        Joi.object().keys({
          name: Joi.string(),
          flag: Joi.string().required(),
          id: Joi.number()
        })
      ),
    }),
  };
  return schemas;
}
