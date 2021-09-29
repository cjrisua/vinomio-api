import { DataTypes, Model, Sequelize } from "sequelize";
import { WineStatic } from "../../wine/types/wine.type";
import { MasterVarietal, Producer } from ".";
import SequelizeSlugify from 'sequelize-slugify';

export function WineFactory (sequelize:Sequelize) : WineStatic {
    const Wine = <WineStatic>sequelize.define("Wines", {
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
        mastervarietalId: {
            type: DataTypes.INTEGER,
            references: {
              model: MasterVarietal, // 'Movies' would also work
              key: 'id'
            }
          },
    });

    SequelizeSlugify.slugifyModel(<any>Wine, {
        source: ['name']
    });

    //Wine.hasOne(Producer, {sourceKey:"id"});
    Producer.hasMany(Wine, { foreignKey:'producerId'});
    //MasterVarietal.hasMany(Wine, { foreignKey:'mastervarietalId'});
    return Wine;
}