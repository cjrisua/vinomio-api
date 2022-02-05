import { DataTypes, Model, Sequelize } from "sequelize";
import { SubscriberStatic } from "../../subscriber/types/subscriber.type";
import SequelizeSlugify from 'sequelize-slugify';
import { User, Role, Collection } from ".";
import { Col } from "sequelize/types/lib/utils";

export function SubscriberFactory (sequelize:Sequelize) : SubscriberStatic {
    const Subscribers = <SubscriberStatic>sequelize.define("Subscribers", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: User,
              key: 'id'
            },
            /*
             onUpdate: 'CASCADE',
             onDelete: 'CASCADE',
             */
        },
        role_id: {
            type: DataTypes.INTEGER,
            references: {
              model: User,
              key: 'id'
            },
            /*
             onUpdate: 'CASCADE',
             onDelete: 'CASCADE',
             */
        },
        cellar_id: {
            type: DataTypes.INTEGER,
            references: {
              model: Collection,
              key: 'id'
            },
            /*
             onUpdate: 'CASCADE',
             onDelete: 'CASCADE',
             */
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

    return Subscribers;
}