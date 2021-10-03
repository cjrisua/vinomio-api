import { BuildOptions, Model } from "sequelize";

export interface ProducerAttributes {
    id?: number;
    slug?: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

export interface ProducerModel extends Model<ProducerAttributes>, ProducerAttributes {}

export class Producer extends Model<ProducerModel, ProducerAttributes> {}

export type ProducerStatic = typeof Model & { new (values ?: object, options?: BuildOptions) : ProducerModel;
};