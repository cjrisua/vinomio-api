import * as sequelize from 'sequelize';
import { ProducerFactory } from './producers.model';
import * as config from '../../config/config.json'

const env: string = process.env.NODE_ENV || "Local";
let sequelize_info = null;

if(env == "Local"){
    sequelize_info = new sequelize.Sequelize(`postgres://${config.development.username}:${config.development.password}@${config.development.host}:${config.development.port}/${config.development.database}`)
}
else{
    sequelize_info = new sequelize.Sequelize(`postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`)
}
export const dbConfig = sequelize_info;
export const Producer = ProducerFactory(dbConfig)