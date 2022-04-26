import { DataTypes, Model, Sequelize } from "sequelize";
import { AllocationEventStatic } from "../../allocationevent/types/allocationevent.type";
import SequelizeSlugify from 'sequelize-slugify';
import { Collection, Allocation } from ".";

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
            references: {
                model: Allocation, 
                key: 'id'
            }
        },
        month: {
            type: DataTypes.STRING,
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

    //SequelizeSlugify.slugifyModel(<any>AllocationEvents, {
    //    source: ['name']
    //});

    return AllocationEvents;
}