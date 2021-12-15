import { BuildOptions, Model } from "sequelize";

export interface ProducerAttributes {
    id?: number;
    slug?: string;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

export interface ProducerModel extends Model<ProducerAttributes>, ProducerAttributes {}

export class Producer extends Model<ProducerModel, ProducerAttributes> implements ProducerAttributes {
  id?: number | undefined;
  slug?: string | undefined;
  name?: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

export type ProducerStatic = typeof Model & { new (values ?: object, options?: BuildOptions) : Producer;
};