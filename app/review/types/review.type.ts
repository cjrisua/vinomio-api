import { BuildOptions, Model } from "sequelize";

export interface ReviewAttributes {
    id: number;
    slug: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

export interface ReviewModel extends Model<ReviewAttributes>, ReviewAttributes {}

export class Review extends Model<ReviewModel, ReviewAttributes> {}

export type ReviewStatic = typeof Model & { new (values ?: object, options?: BuildOptions) : ReviewModel;
};