import { DataTypes, Model, Sequelize } from "sequelize";
import { AllocationEventOfferStatic } from "../../allocationeventoffer/types/allocationeventoffer.type";
import SequelizeSlugify from 'sequelize-slugify';
import { AllocationEvent, Wine } from ".";

export function AllocationEventOfferFactory (sequelize:Sequelize) : AllocationEventOfferStatic {
    const AllocationEventOffers = <AllocationEventOfferStatic>sequelize.define("AllocationEventOffers", {
        /*id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },*/
        allocationEventId:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: AllocationEvent, 
                key: 'id'
            }
        },
        wineId:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: Wine, 
                key: 'id'
            }
        },
        releasePrice:{
            type: DataTypes.DECIMAL(11,2),
            defaultValue:0.00
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

    Wine.hasOne(AllocationEventOffers, {  foreignKey: "wineId"})
    AllocationEventOffers.belongsTo(Wine,  { as: "wine", foreignKey: "wineId"})

    AllocationEvent.hasMany(AllocationEventOffers,{ foreignKey: "allocationEventId"})
    AllocationEventOffers.belongsTo(AllocationEvent,{as:"offers",foreignKey: "allocationEventId"})

    return AllocationEventOffers;
}