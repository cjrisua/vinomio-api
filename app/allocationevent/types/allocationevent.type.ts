import { BuildOptions, Model } from "sequelize";

export interface AllocationEventAttributes {
    id: number;
    slug: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

export interface AllocationEventModel extends Model<AllocationEventAttributes>, AllocationEventAttributes {}

export class AllocationEvent extends Model<AllocationEventModel, AllocationEventAttributes> {}

export type AllocationEventStatic = typeof Model & { new (values ?: object, options?: BuildOptions) : AllocationEventModel;
};