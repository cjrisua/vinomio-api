import { DataTypes, Model, Sequelize } from "sequelize";
import { VintageStatic } from "../../vintage/types/vintage.type";
import SequelizeSlugify from 'sequelize-slugify';
import { dbConfig, Wine } from ".";
import { WineFactory } from "./wines.model";

export function VintageFactory (sequelize:Sequelize) : VintageStatic {
    const Vintage = <VintageStatic>sequelize.define("Vintages", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        year:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        wineId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            //references: {
            //    model: Wine, // 'Movies' would also work
            //    key: 'id'
            //}
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
    });

    SequelizeSlugify.slugifyModel(<any>Vintage, {
        source: ['name']
    });

    const WineStatic  = WineFactory(dbConfig);
    //WineStatic.hasMany(Vintage,{foreignKey:'wineId'})
    //Vintage.belongsTo(WineStatic, {foreignKey:'wineId'});
    Wine.hasMany(Vintage,{foreignKey:'wineId'})
    Vintage.belongsTo(Wine,{foreignKey:'wineId'});

    return Vintage;
}