import { DataTypes, Model, Sequelize } from "sequelize";
import { CellarStatic } from "../../cellar/types/cellar.type";
import SequelizeSlugify from 'sequelize-slugify';
import { dbConfig, User } from ".";
import { UserFactory } from "./users.model";
import { SubscriberFactory } from "./subscribers.model";
import { RoleFactory } from "./roles.model";

export function CellarFactory (sequelize:Sequelize) : CellarStatic {
    const Cellars = <CellarStatic>sequelize.define("Cellars", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull:false,
            defaultValue:'Cellar'
        },
        attributes:{
            type: DataTypes.JSONB,
            defaultValue:'{}',
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

    const Users = UserFactory(dbConfig)
    const Subscriber = SubscriberFactory(dbConfig)

    Users.belongsToMany(Cellars, {foreignKey: "user_id", through:  Subscriber})
    Cellars.belongsToMany(Users, {foreignKey: "cellar_id", through: Subscriber})

    return Cellars;
}