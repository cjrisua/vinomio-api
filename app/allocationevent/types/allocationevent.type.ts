import { BuildOptions, Model } from "sequelize";
import { AllocationEventOffer } from "../../allocationeventoffer/types/allocationeventoffer.type";

export interface AllocationEventAttributes {
    id?: number;
    //slug?: string;
    name?: string;
    allocationId?:number,
    month?:string,
    createdAt?: Date;
    updatedAt?: Date;
    offers?:AllocationEventOffer[]
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