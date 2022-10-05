import { BuildOptions, Model } from "sequelize";

export interface TagAttributes {
    id: number;
    slug: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

export interface TagModel extends Model<TagAttributes>, TagAttributes {}

export class Tag extends Model<TagModel, TagAttributes> {}

export type TagStatic = typeof Model & { new (values ?: object, options?: BuildOptions) : TagModel;
};