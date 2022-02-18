import { DataTypes, Model, Sequelize } from "sequelize";
import { AllocationStatic } from "../../allocation/types/allocation.type";
import SequelizeSlugify from 'sequelize-slugify';
import { Merchant } from ".";

export function AllocationFactory (sequelize:Sequelize) : AllocationStatic {
    const Allocations = <AllocationStatic>sequelize.define("Allocations", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        merchantId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        memberSince:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        lastPurchase:{
            type: DataTypes.DATE,
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

    Merchant.hasOne(Allocations, { foreignKey: "merchantId"})
    Allocations.belongsTo(Merchant, {as: "merchant", foreignKey: "merchantId"})

    return Allocations;
}