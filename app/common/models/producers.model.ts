import { DataTypes, Sequelize } from "sequelize";
import { ProducerStatic } from "../../producers/types/producers.type";

export function ProducerFactory (sequelize:Sequelize) : ProducerStatic {
    return <ProducerStatic>sequelize.define("producers", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
}