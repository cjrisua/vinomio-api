import { DataTypes, Model, Sequelize } from "sequelize";
import { RoleStatic } from "../../role/types/role.type";
import SequelizeSlugify from 'sequelize-slugify';

export function RoleFactory (sequelize:Sequelize) : RoleStatic {
    const Roles = <RoleStatic>sequelize.define("Roles", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.ENUM('admin','collector','observer'),
            defaultValue: 'collector',
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

    return Roles;
}