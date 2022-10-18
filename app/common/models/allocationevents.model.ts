import { DataTypes, Model, Sequelize } from "sequelize";
import { Allocation, dbConfig } from ".";
import { AllocationStatic } from "../../allocation/types/allocation.type";
import { AllocationEventStatic } from "../../allocationevent/types/allocationevent.type";
import { AllocationFactory } from "./allocations.model";

export function AllocationEventFactory (sequelize:Sequelize) : AllocationEventStatic {

    //const rawQuery="SELECT "

    const AllocationEvents = <AllocationEventStatic>sequelize.define("AllocationEvents", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        allocationId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            /*onDelete:'CASCADE',
            references: {
                model: Allocation, 
                key: 'id'
            }*/
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

    //const Allocations = AllocationFactory(dbConfig);
    //Allocations.hasOne(AllocationEvents, {foreignKey: "allocationId"})
    //AllocationEvents.belongsTo(Allocations, {foreignKey: "allocationId"})
    //AllocationEvent.belongsTo(Allocation,{as:"events"})
    //const allocation = AllocationFactory(dbConfig);
    //allocation.hasMany(AllocationEvent)
    //AllocationEvent.belongsTo(allocation)
    //SequelizeSlugify.slugifyModel(<any>AllocationEvents, {
    //    source: ['name']
    //});
    //const Allocations = AllocationFactory(dbConfig);
    //AllocationEvents.hasOne(Allocations)
    //Allocations.belongsTo(AllocationEvents)

    return AllocationEvents;
}