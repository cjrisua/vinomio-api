import { BuildOptions, Model } from "sequelize";

export interface AllocationAttributes {
    id: number;
    slug: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

export interface AllocationModel extends Model<AllocationAttributes>, AllocationAttributes {}

export class Allocation extends Model<AllocationModel, AllocationAttributes> {}

export type AllocationStatic = typeof Model & { new (values ?: object, options?: BuildOptions) : AllocationModel;
};