import { DataTypes, Model, Sequelize } from "sequelize";
import { CountryStatic } from "../../country/types/country.type";
import SequelizeSlugify from 'sequelize-slugify';

export function CountryFactory (sequelize:Sequelize) : CountryStatic {
    const Countries = <CountryStatic>sequelize.define("Countries", {
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

    SequelizeSlugify.slugifyModel(<any>Countries, {
        source: ['name']
    });

    return Countries;
}