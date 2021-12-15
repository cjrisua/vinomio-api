import { DataTypes, Model, Sequelize } from "sequelize";
import { RegionStatic } from "../../region/types/region.type";
import { Country } from ".";
import SequelizeSlugify from 'sequelize-slugify';


export function RegionFactory (sequelize:Sequelize) : RegionStatic {

    const Regions = <RegionStatic>sequelize.define("Regions", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        slug: {
            type: DataTypes.STRING,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        terroir: {
            type: DataTypes.VIRTUAL,
           // get(){ return "this.terroir" },
            set(value:string){ 
                this.setDataValue('terroir', value);
            }
        }
    });
    
    SequelizeSlugify.slugifyModel(<any>Regions, {
        source: ['name']
    });

    Regions.belongsTo(Country,{ as: 'country', foreignKey: {name: 'countryId', allowNull:false} });
    
    Regions.belongsTo(Regions, { as: 'parent', foreignKey: 'parentId'});
    Regions.hasMany(Regions, {as: 'regions', foreignKey: 'parentId'})

    return Regions;
}