import { BuildOptions, Model } from "sequelize";

export interface MerchantAttributes {
    id: number;
    slug: string;
    name: string;
    producerId:number;
    userId:number;
    createdAt?: Date;
    updatedAt?: Date;
  }

export interface MerchantModel extends Model<MerchantAttributes>, MerchantAttributes {}

export class Merchant extends Model<MerchantModel, MerchantAttributes> {}

export type MerchantStatic = typeof Model & { new (values ?: object, options?: BuildOptions) : MerchantModel;
};