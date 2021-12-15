import { 
  BuildOptions, Model, Association,
  HasManyGetAssociationsMixin, 
  HasManyAddAssociationMixin,
} from "sequelize";

export interface RegionAttributes {
    id?: number;
    slug?: string;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
    countryId?: number;
    parentId?: number;
    terroir?: string
  }

export interface RegionModel extends Model<RegionAttributes>, RegionAttributes {}

export class Region extends Model<RegionModel, RegionAttributes>  implements RegionAttributes {
  
  public id!: number;
  public slug!: string;
  public name!: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public countryId!: number;
  public parentId!: number;
  public terroir!: string;

  public getRegions !: HasManyGetAssociationsMixin<Region>
  public addRegion!: HasManyAddAssociationMixin<Region, number>;

  public readonly regions?: Region[];
  
  public static associations: {
    regions: Association<Region>;
    parent: Association<Region>;
  };
}

export type RegionStatic = typeof Model & { new (values ?: object, options?: BuildOptions) : Region;
};

