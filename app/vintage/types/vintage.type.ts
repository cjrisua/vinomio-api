import express from "express";
import { Association, BuildOptions, Model, BelongsToGetAssociationMixin } from "sequelize";
import { MapQParams } from "../../common/common.middleware.config";
import Logger from "../../lib/logger";
import { Wine } from "../../wine/types/wine.type";

export interface VintageApiQPrams{
  id: number;
  year: number;
}

export interface VintageAttributes {
    id: number;
    year: number;
    wineId: number;
    createdAt?: Date;
    updatedAt?: Date;
  }

export interface VintageModel extends Model<VintageAttributes>, VintageAttributes {}

export class Vintage extends Model<VintageModel, VintageAttributes> implements VintageAttributes{
  
  public id!: number;
  public year!: number;
  public wineId!: number;
  public createdAt?: Date;
  public updatedAt?: Date;
  public wine?: Wine;

  public getWine!:BelongsToGetAssociationMixin<Wine>

  public static associations: {
    wine: Association<Wine>;
  };
}

export type VintageStatic = typeof Model & { new (values ?: object, options?: BuildOptions) : Vintage;
};

export function VintageQParameterFilter (req: express.Request){
  Logger.debug("VintageQParameterFilter")
  const queryItems: VintageApiQPrams = {
      id!: Number(req.query.id),
      year!: Number(req.query.year)
  };
  const filter = MapQParams(queryItems);
  Logger.debug(filter)
  return filter
}
