import { BuildOptions, Model } from "sequelize";

export interface AllocationEventAttributes {
    id?: number;
    //slug?: string;
    name?: string;
    allocationId?:number,
    month?:string,
    createdAt?: Date;
    updatedAt?: Date;
  }

export interface AllocationEventModel extends Model<AllocationEventAttributes>, AllocationEventAttributes {}

export class AllocationEvent extends Model<AllocationEventModel, AllocationEventAttributes> implements AllocationEventAttributes{
  public id?: number;
  //slug?: string;
  name?: string;
  allocationId?:number;
  public month?:string;
  createdAt?: Date;
  updatedAt?: Date;

}

export type AllocationEventStatic = typeof Model & { new (values ?: object, options?: BuildOptions) : AllocationEvent;
};