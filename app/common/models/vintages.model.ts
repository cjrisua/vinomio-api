import { DataTypes, Model, Sequelize } from "sequelize";
import { VintageStatic } from "../../vintage/types/vintage.type";
import SequelizeSlugify from 'sequelize-slugify';
import { Wine } from ".";

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

    //Wine.hasOne(Vintage,{foreignKey:'wineId'})
    //Vintage.belongsTo(Wine, {foreignKey:'wineId'});

    return Vintage;
}