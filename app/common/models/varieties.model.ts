import { DataTypes, Sequelize } from "sequelize";
import { VarietyStatic } from "../../variety/types/variety.type";
import SequelizeSlugify from 'sequelize-slugify';

export function VarietyFactory (sequelize:Sequelize) : VarietyStatic {
    const Variety = <VarietyStatic>sequelize.define("Varieties", {
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

    SequelizeSlugify.slugifyModel(<any>Variety, {
        source: ['name']
    });

    return Variety;
}