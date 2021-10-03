import { BuildOptions, Model } from "sequelize";

export interface VarietyBlendAttributes {
    varietyId?: number;
    mastervarietalId?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }

export interface VarietyBlendModel extends Model<VarietyBlendAttributes>, VarietyBlendAttributes {}

export class VarietyBlend extends Model<VarietyBlendModel, VarietyBlendAttributes> {}

export type VarietyBlendStatic = typeof Model & { new (values ?: object, options?: BuildOptions) : VarietyBlend;
};