import { BuildOptions, Model } from "sequelize";

export interface AllocationEventOfferAttributes {
    id: number;
    slug: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

export interface AllocationEventOfferModel extends Model<AllocationEventOfferAttributes>, AllocationEventOfferAttributes {}

export class AllocationEventOffer extends Model<AllocationEventOfferModel, AllocationEventOfferAttributes> {}

export type AllocationEventOfferStatic = typeof Model & { new (values ?: object, options?: BuildOptions) : AllocationEventOfferModel;
};