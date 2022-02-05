import { BuildOptions, Model, BelongsToManyAddAssociationMixin, BelongsToSetAssociationMixin } from "sequelize";
import { CollectionEvent } from "../../collectionevent/types/collectionevent.type";

export interface CollectionAttributes {
    id: number;
    vintageId:number;
    statusId:string;
    cellarId:number;
    createdAt?: Date;
    updatedAt?: Date;
  }

export interface CollectionModel extends Model<CollectionAttributes>, CollectionAttributes {}

export class Collection extends Model<CollectionModel, CollectionAttributes> implements CollectionAttributes{
  id!: number;
  vintageId!: number;
  statusId!: string;
  cellarId!: number;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  
  public addEvent!: BelongsToManyAddAssociationMixin<CollectionEvent, number>;
  public setEvent!: BelongsToSetAssociationMixin<CollectionEvent,number>;
}

export type CollectionStatic = typeof Model & { new (values ?: object, options?: BuildOptions) : Collection;
};