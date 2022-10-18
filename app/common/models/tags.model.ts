import { DataTypes, Model, Sequelize } from "sequelize";
import { TagStatic } from "../../tag/types/tag.type";
import SequelizeSlugify from 'sequelize-slugify';

export function TagFactory (sequelize:Sequelize) : TagStatic {
    const Tags = <TagStatic>sequelize.define("Tags", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            unique: true
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

    return Tags;
}