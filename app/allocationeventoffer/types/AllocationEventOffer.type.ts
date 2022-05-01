import { BuildOptions, Model } from "sequelize";
import { Wine } from "../../wine/types/wine.type";

export interface AllocationEventOfferAttributes {
    id: number;
    slug: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    wine?: Wine;
    releasePrice?:number
  }

export interface AllocationEventOfferModel extends Model<AllocationEventOfferAttributes>, AllocationEventOfferAttributes {}

export class AllocationEventOffer extends Model<AllocationEventOfferModel, AllocationEventOfferAttributes> {}

export type AllocationEventOfferStatic = typeof Model & { new (values ?: object, options?: BuildOptions) : AllocationEventOfferModel;
};