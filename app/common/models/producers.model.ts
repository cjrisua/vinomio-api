import { DataTypes, Model, Sequelize } from "sequelize";
import { ProducerStatic } from "../../producers/types/producers.type";
import SequelizeSlugify from 'sequelize-slugify';

export function ProducerFactory (sequelize:Sequelize) : ProducerStatic {
    const Producers = <ProducerStatic>sequelize.define("producers", {
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

    SequelizeSlugify.slugifyModel(<any>Producers, {
        source: ['name']
    });

    return Producers;
}