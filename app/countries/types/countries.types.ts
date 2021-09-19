import { BuildOptions, Model } from "sequelize";

export interface CountryAttributes {
    id: number;
    slug: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

export interface CountryModel extends Model<CountryAttributes>, CountryAttributes {}

export class Producer extends Model<CountryModel, CountryAttributes> {}

export type CountryStatic = typeof Model & { new (values ?: object, options?: BuildOptions) : CountryModel;
};