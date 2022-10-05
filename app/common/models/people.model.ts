import { DataTypes, Model, Sequelize } from "sequelize";
import { PeopleStatic } from "../../people/types/people.type";
import SequelizeSlugify from 'sequelize-slugify';
import { Review, Role } from ".";

export function PeopleFactory (sequelize:Sequelize) : PeopleStatic {
    const People = <PeopleStatic>sequelize.define("People", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        handler:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull:false
            //type: DataTypes.INTEGER,
            //references: {
             // model: Role, 
             // key: 'id'
            //},
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

    return People;
}