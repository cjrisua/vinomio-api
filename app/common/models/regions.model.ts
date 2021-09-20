import { DataTypes, Model, Sequelize } from "sequelize";
import { RegionStatic } from "../../region/types/region.type";
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
    });

    SequelizeSlugify.slugifyModel(<any>Regions, {
        source: ['name']
    });

    return Regions;
}