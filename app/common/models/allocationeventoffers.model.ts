import { DataTypes, Model, Sequelize } from "sequelize";
import { AllocationEventOfferStatic } from "../../allocationeventoffer/types/allocationeventoffer.type";
import SequelizeSlugify from 'sequelize-slugify';
import { AllocationEvent, Wine } from ".";

export function AllocationEventOfferFactory (sequelize:Sequelize) : AllocationEventOfferStatic {
    const AllocationEventOffers = <AllocationEventOfferStatic>sequelize.define("AllocationEventOffers", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        allocationEventId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: AllocationEvent, 
                key: 'id'
            }
        },
        wineId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Wine, 
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

    return AllocationEventOffers;
}