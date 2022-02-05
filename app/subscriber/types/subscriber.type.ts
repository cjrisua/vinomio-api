import { BuildOptions, Model } from "sequelize";

export interface SubscriberAttributes {
    id: number;
    slug: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

export interface SubscriberModel extends Model<SubscriberAttributes>, SubscriberAttributes {}

export class Subscriber extends Model<SubscriberModel, SubscriberAttributes> {}

export type SubscriberStatic = typeof Model & { new (values ?: object, options?: BuildOptions) : SubscriberModel;
};