import { Association, BelongsToManyAddAssociationMixin, BuildOptions, Model } from "sequelize";
import { Role } from "../../role/types/role.type";
import { User } from "../../user/types/user.type";

export interface CellarAttributes {
    id: number;
    attributes: JSON;
    subscribers?:[];
    createdAt?: Date;
    updatedAt?: Date;
  }

export interface CellarModel extends Model<CellarAttributes>, CellarAttributes {}

export class Cellar extends Model<CellarModel, CellarAttributes>  implements CellarAttributes{

  id!: number;
  attributes!: JSON;
  subscribers!:[];
  //roles!:[];
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;

  public addUsers!: BelongsToManyAddAssociationMixin<User, number>;

  /*
  public static associations: {
    subscribers: Association<User>;
  };*/

}

export type CellarStatic = typeof Model & { new (values ?: object, options?: BuildOptions) : Cellar;
};