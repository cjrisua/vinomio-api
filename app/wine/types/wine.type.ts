import { BuildOptions, Model } from "sequelize";

export interface WineAttributes {
    id?: number;
    slug?: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    mastervarietalId?:number;
    regionId?:number;
    producerId?:number;
  }

export interface WineModel extends Model<WineAttributes>, WineAttributes {}

export class Wine extends Model<WineModel, WineAttributes> {}

export type WineStatic = typeof Model & { new (values ?: object, options?: BuildOptions) : WineModel;
};