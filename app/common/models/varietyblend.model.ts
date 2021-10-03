import { DataTypes, Model, Sequelize } from "sequelize";
import { MasterVarietal,Variety } from ".";
import { VarietyBlendStatic } from "../../varietryblend/types/variety.type";

export function VarietyBlendFactory (sequelize:Sequelize) : VarietyBlendStatic {
    const VarietyBlend = <VarietyBlendStatic>sequelize.define("VarietyBlend", {
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
              model: MasterVarietal, 
              key: 'id'
            }
        },
        varietyId: {
            type: DataTypes.INTEGER,
            references: {
              model: Variety, 
              key: 'id'
            }
        }
    });

    return VarietyBlend;
}