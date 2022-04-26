import { DataTypes, Model, Sequelize } from "sequelize";
import { MerchantStatic } from "../../merchant/types/merchant.type";
import SequelizeSlugify from 'sequelize-slugify';
import { Producer, User } from ".";

export function MerchantFactory (sequelize:Sequelize) : MerchantStatic {
    const Merchants = <MerchantStatic>sequelize.define("Merchants", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        slug: {
            type: DataTypes.STRING,
            unique: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User, 
                key: 'id'
            }
        },
        producerId:{
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Producer, 
                key: 'id'
            }
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

    SequelizeSlugify.slugifyModel(<any>Merchants, {
        source: ['name']
    });

    return Merchants;
}