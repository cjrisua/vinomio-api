import { BuildOptions, Model } from "sequelize";

export interface VarietyAttributes {
    id?: number;
    slug?: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

export interface VarietyModel extends Model<VarietyAttributes>, VarietyAttributes {}

export class Variety extends Model<VarietyModel, VarietyAttributes> {}

export type VarietyStatic = typeof Model & { new (values ?: object, options?: BuildOptions) : VarietyModel;
};