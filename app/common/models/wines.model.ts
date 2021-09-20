import { DataTypes, Model, Sequelize } from "sequelize";
import { WineStatic } from "../../wine/types/wine.type";
import SequelizeSlugify from 'sequelize-slugify';

export function WineFactory (sequelize:Sequelize) : WineStatic {
    const Wines = <WineStatic>sequelize.define("Wines", {
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
    });

    SequelizeSlugify.slugifyModel(<any>Wines, {
        source: ['name']
    });

    return Wines;
}