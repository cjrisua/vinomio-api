import { BuildOptions, Model } from "sequelize";

export interface PeopleAttributes {
    id: number;
    name: string;
    handler?: string;
    role:string
    createdAt?: Date;
    updatedAt?: Date;
  }

export interface PeopleModel extends Model<PeopleAttributes>, PeopleAttributes {}

export class People extends Model<PeopleModel, PeopleAttributes> {}

export type PeopleStatic = typeof Model & { new (values ?: object, options?: BuildOptions) : PeopleModel;
};