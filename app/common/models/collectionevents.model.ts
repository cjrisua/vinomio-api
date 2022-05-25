import { DataTypes, Sequelize } from "sequelize";
import { CollectionEventStatic } from "../../collectionevent/types/collectionevent.type";
import { Collection, dbConfig } from ".";
import { CollectionFactory } from "./collections.model";

export function CollectionEventFactory (sequelize:Sequelize) : CollectionEventStatic {
    const CollectionEvents = <CollectionEventStatic>sequelize.define("CollectionEvents", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        
        //sequence:{
        //    type: DataTypes.INTEGER,
        //    allowNull: false,
            /*defaultValue: sequelize.Sequelize.literal('nextval("event_sequence")')*/
            /*vino_db=# CREATE SEQUENCE event_sequence START 1 INCREMENT 1
            vino_db-# OWNED BY "CollectionEvents."id";*/
        //},
        action:{
            type: DataTypes.ENUM('PurchasedOn','DeliveredBy','DeliveredOn','DrunkOn','RemovedOn','RestoredOn'),
            allowNull: true,
        },
        actionDate:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        collectionId:{
            type: DataTypes.INTEGER,
            onDelete:'CASCADE',
            references: {
              model: Collection,
              key: 'id'
            },
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    });

    //const Collections = CollectionFactory(dbConfig)
    //Collections.hasMany(CollectionEvents,{foreignKey: 'collectionId'})
    //CollectionEvents.belongsTo(Collections,{foreignKey: 'collectionId'})
    
    return CollectionEvents;
}