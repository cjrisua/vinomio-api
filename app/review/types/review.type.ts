import { BelongsToManyAddAssociationMixin, BelongsToManyRemoveAssociationMixin, BuildOptions, Model } from "sequelize";
import { Tag } from "../../tag/types/tag.type";

export interface ReviewAttributes {
    id: number;
    slug: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

  
export interface ReviewModel extends Model<ReviewAttributes>, ReviewAttributes {}

export class Review extends Model<ReviewModel, ReviewAttributes>  implements ReviewAttributes {
  id!: number;
  slug!: string;
  name!: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;

  public addTags!: BelongsToManyAddAssociationMixin<Tag, number>;
  public removeTag!: BelongsToManyRemoveAssociationMixin<Tag, number>;

}

export type ReviewStatic = typeof Model & { new (values ?: object, options?: BuildOptions) : Review;
};