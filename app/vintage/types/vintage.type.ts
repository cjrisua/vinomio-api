import { BuildOptions, Model } from "sequelize";

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

}

export type VintageStatic = typeof Model & { new (values ?: object, options?: BuildOptions) : Vintage;
};