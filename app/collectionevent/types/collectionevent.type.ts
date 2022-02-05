import { BuildOptions, Model } from "sequelize";

export interface CollectioneventAttributes {
    id?: number;
    //sequence:number;
    action:string;
    actionDate: Date;
    collectionId:number;
    createdAt?: Date;
  }

export interface CollectionEventModel extends Model<CollectioneventAttributes>, CollectioneventAttributes {}

export class CollectionEvent extends Model<CollectionEventModel, CollectioneventAttributes> {}

export type CollectionEventStatic = typeof Model & { new (values ?: object, options?: BuildOptions) : CollectionEventModel;
};