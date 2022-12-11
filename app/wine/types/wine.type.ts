import { Association, BuildOptions, Model } from "sequelize";
import { Region } from "../../region/types/region.type";

export interface WineAttributes {
    id?: number;
    slug?: string;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
    mastervarietalId?:number;
    regionId?:number;
    producerId?:number;
  }

export interface WineModel extends Model<WineAttributes>, WineAttributes {}

export class Wine extends Model<WineModel, WineAttributes> implements WineAttributes {
  id?: number | undefined;
  slug?: string | undefined;
  name?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  mastervarietalId?: number | undefined;
  regionId?: number | undefined;
  producerId?: number | undefined;
  scoreAverage?: number | undefined;

  public static associations: {
    region: Association<Region>;

  }
  //public scoreAverage()
}

export type WineStatic = typeof Model & { new (values ?: object, options?: BuildOptions) : Wine;
};