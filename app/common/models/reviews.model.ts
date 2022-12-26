import { DataTypes, Model, Sequelize } from "sequelize";
import { ReviewStatic } from "../../review/types/review.type";
import { dbConfig, People, Vintage } from ".";
import { TagFactory } from "./tags.model";
import { PeopleFactory } from "./people.model";
import { VintageFactory } from "./vintages.model";

export function ReviewFactory (sequelize:Sequelize) : ReviewStatic {
    const Reviews  = <ReviewStatic>sequelize.define("Reviews", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        review:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        score:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        vintageId: {
            type: DataTypes.INTEGER,
            references: {
              model: Vintage,
              key: 'id'
            },
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

    const Tags = TagFactory(dbConfig)
    const Peoples = PeopleFactory(dbConfig)
    //const Vintages = VintageFactory(dbConfig)

    Reviews.belongsToMany(Tags, {foreignKey:'reviewId', through: 'ReviewTags'})
    Tags.belongsToMany(Reviews, {foreignKey:'tagId', through: 'ReviewTags'})

    Peoples.hasOne(Reviews, {foreignKey:"publisherId"})
    Reviews.belongsTo(Peoples, {as: "people", foreignKey:"publisherId"})

    //Vintages.hasMany(Reviews,{foreignKey:"vintageId"} )
    //Reviews.belongsTo(Vintage,{foreignKey:"vintageId"})

    return Reviews;
}