import { BuildOptions, Model } from "sequelize";
import { AllocationEvent } from "../../allocationevent/types/allocationevent.type";

export interface AllocationAttributes {
    id: number;
    slug: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    events?: AllocationEvent[];
  }

export interface AllocationModel extends Model<AllocationAttributes>, AllocationAttributes {}

export class Allocation extends Model<AllocationModel, AllocationAttributes> {}

export type AllocationStatic = typeof Model & { new (values ?: object, options?: BuildOptions) : AllocationModel;
};