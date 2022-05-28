import { DataTypes, Sequelize } from "sequelize";
import { CollectionStatic } from "../../collection/types/collection.type";
import { AllocationEvent, Cellar, CollectionEvent, dbConfig, Merchant, Vintage } from ".";
import { CellarFactory } from "./cellars.model";
import { CollectionEventFactory } from "./collectionevents.model";
import { VintageFactory } from "./vintages.model";

export function CollectionFactory (sequelize:Sequelize) : CollectionStatic {
    const Collections = <CollectionStatic>sequelize.define("Collections", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        vintageId: {
            type: DataTypes.INTEGER,
            references: {
              model: Vintage,
              key: 'id'
            },
            allowNull: false,
        },
        statusId:{
            type: DataTypes.ENUM('allocated','pending','drunk','deleted'),
            defaultValue: 'allocated',
        },
        cellarId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(11,2),
            defaultValue:0.00
        },
        locationId:{
            type: DataTypes.INTEGER,
            defaultValue:0
        },
        acquiringSourceId:{
            type: DataTypes.INTEGER,
        },
        allocationEventId:{
            type: DataTypes.INTEGER,
        },
        purchaseNote:{
            type: DataTypes.STRING,
        },
        bottleSize: {
            type: DataTypes.ENUM('750ml','1.5L','375ml'),
            defaultValue: '750ml',
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
    const Cellars = CellarFactory(dbConfig)
    const CollectionEvents = CollectionEventFactory(dbConfig)
    const Vintages = VintageFactory(dbConfig)

    Cellars.hasMany(Collections,{foreignKey: 'cellarId'})
    Collections.belongsTo(Cellars,{foreignKey: 'cellarId'})

    Collections.hasMany(CollectionEvents,{ foreignKey: 'collectionId'})
    CollectionEvents.belongsTo(Collections,{foreignKey: 'collectionId'})

    Vintage.hasMany(Collections, {foreignKey: 'vintageId'})
    Collections.belongsTo(Vintage, {foreignKey: 'vintageId'})

    return Collections;
}