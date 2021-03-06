import { DataTypes, Model, Sequelize } from "sequelize";
import { AllocationEventStatic } from "../../allocationevent/types/allocationevent.type";
import SequelizeSlugify from 'sequelize-slugify';
import { Collection, Allocation, AllocationEventOffer, AllocationEvent, dbConfig } from ".";
import { AllocationEventOfferFactory } from "./allocationeventoffers.model";
import { AllocationFactory } from "./allocations.model";

export function AllocationEventFactory (sequelize:Sequelize) : AllocationEventStatic {
    const AllocationEvents = <AllocationEventStatic>sequelize.define("AllocationEvents", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        //slug: {
        //    type: DataTypes.STRING,
        //    unique: true
        //},
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        allocationId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete:'CASCADE',
            references: {
                model: Allocation, 
                key: 'id'
            }
        },
        month: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastPurchase:{
            type: DataTypes.DATE,
            allowNull: true,
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
    
    //AllocationEvent.belongsTo(Allocation,{as:"events"})
    //const allocation = AllocationFactory(dbConfig);
    //allocation.hasMany(AllocationEvent)
    //AllocationEvent.belongsTo(allocation)
    //SequelizeSlugify.slugifyModel(<any>AllocationEvents, {
    //    source: ['name']
    //});

    return AllocationEvents;
}