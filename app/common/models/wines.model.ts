import { DataTypes, Model, Sequelize } from "sequelize";
import { WineStatic } from "../../wine/types/wine.type";
import { dbConfig, MasterVarietal, Producer, Region, Vintage } from ".";
import SequelizeSlugify from 'sequelize-slugify';
import { RegionFactory } from "./regions.model";
import { MasterVarietalFactory } from "./mastervarietals.model";
import { VintageFactory } from "./vintages.model";

export function WineFactory (sequelize:Sequelize) : WineStatic {
    const Wine = <WineStatic>sequelize.define("Wines", {
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
        mastervarietalId: {
            type: DataTypes.INTEGER,
            references: {
              model: MasterVarietal, // 'Movies' would also work
              key: 'id'
            },
            /*
             onUpdate: 'CASCADE',
             onDelete: 'CASCADE',
             */
        },
        regionId:{
            type: DataTypes.INTEGER,
            references: {
              model: Region, // 'Movies' would also work
              key: 'id'
            }
        },
        producerId:{
            type: DataTypes.INTEGER,
            references: {
              model: Producer, // 'Movies' would also work
              key: 'id'
            }
        }
    });

    SequelizeSlugify.slugifyModel(<any>Wine, {
        source: ['name']
    });

    //Wine.hasOne(Producer, {sourceKey:"id"});
    //Producer.hasMany(Wine, { foreignKey:'producerId'});
    //Region.hasMany(Wine, { foreignKey:'regionId'});
    //MasterVarietal.hasMany(Wine, { foreignKey:'mastervarietalId'});
    Producer.hasOne(Wine, { foreignKey:'producerId'})
    Wine.belongsTo(Producer, {foreignKey:'producerId'})

    const RegionStatic  = RegionFactory(dbConfig);
    RegionStatic.hasOne(Wine, {foreignKey:'regionId'})
    Wine.belongsTo(RegionStatic, { foreignKey:'regionId'})

    const MasterVarietalStatic  = MasterVarietalFactory(dbConfig);
    MasterVarietalStatic.hasOne(Wine, {foreignKey:'mastervarietalId'})
    Wine.belongsTo(MasterVarietalStatic, {foreignKey:'mastervarietalId'})

    //const VintageStatic  = VintageFactory(dbConfig);
    //Wine.hasMany(VintageStatic, {foreignKey:'wineId'})
    //VintageStatic.belongsTo(Wine, {foreignKey:'wineId'})

    return Wine;
}