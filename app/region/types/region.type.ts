import { BuildOptions, Model } from "sequelize";

export interface RegionAttributes {
    id: number;
    slug: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

export interface RegionModel extends Model<RegionAttributes>, RegionAttributes {}

export class Region extends Model<RegionModel, RegionAttributes> {}

export type RegionStatic = typeof Model & { new (values ?: object, options?: BuildOptions) : RegionModel;
};