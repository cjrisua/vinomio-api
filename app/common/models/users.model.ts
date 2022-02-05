import { DataTypes, Model, Sequelize } from "sequelize";
import { UserStatic } from "../../user/types/user.type";
import SequelizeSlugify from 'sequelize-slugify';
import bcrypt from "bcrypt"
import { CellarFactory } from "./cellars.model";
import { dbConfig } from ".";
import { SubscriberFactory } from "./subscribers.model";

export function Hash(password:string) {
    return new Promise((resolve, reject) => {
        let hashed: string;
        bcrypt.hash(password, 10, function(err, hash) {
            if (err) reject(err);
          else {
            resolve(hash);
          }
        })
    })
}

export function UserFactory (sequelize:Sequelize) : UserStatic {

    //async function hashIt(password: string){
    //    const salt = await bcrypt.genSalt(6);
    //    const hashed = await bcrypt.hash(password, salt);
    //}

    const Users = <UserStatic>sequelize.define("Users", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        handler: {
            type: DataTypes.STRING,
            unique: true,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            set(value:string) {
                // Storing passwords in plaintext in the database is terrible.
                // Hashing the value with an appropriate cryptographic hash function is better.
                //hashIt(value)
                console.log("pwd: " + value)
                const salt = bcrypt.genSaltSync(6)
                this.setDataValue('password', bcrypt.hashSync(value,salt)) 
              }
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

    //const Subscriber = SubscriberFactory(dbConfig)

    //Subscriber.hasMany(Users,{foreignKey:'user_id'})
    //Users.belongsTo(Subscriber,{foreignKey:'user_id'})

    /*
    SequelizeSlugify.slugifyModel(<any>Users, {
        source: ['name']
    });
    */
   
    return Users;
}