import { BuildOptions, Model } from "sequelize";

export interface RoleAttributes {
    id: number;
    slug: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

export interface RoleModel extends Model<RoleAttributes>, RoleAttributes {}

export class Role extends Model<RoleModel, RoleAttributes> {}

export type RoleStatic = typeof Model & { new (values ?: object, options?: BuildOptions) : RoleModel;
};