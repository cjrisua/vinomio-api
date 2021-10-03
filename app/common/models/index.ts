import * as sequelize from 'sequelize';
import { ProducerFactory } from './producers.model';
import { CountryFactory } from './countries.model';
import { WineFactory } from './wines.model';
import { RegionFactory } from './regions.model';
import * as config from '../../config/config.json'
import { VarietyFactory } from './varieties.model';
import { MasterVarietalFactory } from './mastervarietals.model';
import exp from 'constants';
import { VintageFactory } from './vintages.model';

const env: string = process.env.NODE_ENV || "Local";
let sequelize_info = null;

//console.log(process.env);

if(env == "Local"){
    sequelize_info = new sequelize.Sequelize(`postgres://${config.development.username}:${config.development.password}@${config.development.host}:${config.development.port}/${config.development.database}`)
}
else{
    sequelize_info = new sequelize.Sequelize(`postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`)
}
export const dbConfig = sequelize_info;
export const Producer = ProducerFactory(dbConfig);
export const Country = CountryFactory(dbConfig);
export const Wine = WineFactory(dbConfig);
export const Region = RegionFactory(dbConfig);
export const Variety = VarietyFactory(dbConfig);
export const MasterVarietal = MasterVarietalFactory(dbConfig);
export const Vintage = VintageFactory(dbConfig);