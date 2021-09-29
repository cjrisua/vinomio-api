import { 
  BuildOptions, Model,
  BelongsToManyAddAssociationMixin,
  Association

} from "sequelize";
import { Variety } from "../../variety/types/variety.type";

export interface MasterVarietalAttributes {
    id: number;
    slug: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

export interface MasterVarietyModel extends Model<MasterVarietalAttributes>, MasterVarietalAttributes {}

export class MasterVarietal extends Model<MasterVarietyModel, MasterVarietalAttributes> implements MasterVarietalAttributes {

  public id!: number;
  public slug!: string;
  public name!: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  public addVariety!: BelongsToManyAddAssociationMixin<Variety, number>;

  public static associations: {
    varieties: Association<Variety>;
  };
}

export type MasterVarietyStatic = typeof Model & { new (values ?: object, options?: BuildOptions) : MasterVarietal;
};