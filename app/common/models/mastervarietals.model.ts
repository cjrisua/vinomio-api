import { DataTypes, Model, Sequelize } from "sequelize";
import { MasterVarietyStatic } from "../../mastervarietal/types/mastervarietal.type";
import SequelizeSlugify from 'sequelize-slugify';
import { VarietyFactory } from "./varieties.model";
import { dbConfig } from ".";
import { VarietyBlendFactory } from "./varietyblend.model";

/*
CREATE TYPE enum_MasterVarietal_color AS ENUM ('Red','White','Rose');
CREATE TYPE enum_MasterVarietal_type AS ENUM('Red','White','Rose','Sparkling','Dessert','Fortified');

ALTER TABLE "MasterVarietals" ADD COLUMN color enum_MasterVarietal_color;
ALTER TABLE "MasterVarietals" ADD COLUMN type enum_MasterVarietal_type;

*/

export function MasterVarietalFactory (sequelize:Sequelize) : MasterVarietyStatic {
    const MasterVarietal = <MasterVarietyStatic>sequelize.define("MasterVarietals", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        slug: {
            type: DataTypes.STRING,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.ENUM('Red','White','Rosé'),
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('Red','White','Rosé','Sparkling','Dessert','Fortified'),
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

    SequelizeSlugify.slugifyModel(<any>MasterVarietal, {
        source: ['name']
    });

    const Variety = VarietyFactory(dbConfig);
    const VarietylBlend = VarietyBlendFactory(dbConfig);


    Variety.belongsToMany(MasterVarietal,{ as: "mastervarietals", foreignKey:"varietyId", through: VarietylBlend});
    MasterVarietal.belongsToMany(Variety,{ as: "varieties", foreignKey:"mastervarietalId", through: VarietylBlend});

    return MasterVarietal;
}