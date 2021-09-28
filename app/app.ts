import * as dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import * as http from 'http';
import * as bodyparser from 'body-parser';

import Logger from "./lib/logger";
import morganMiddleware from './config/morganMiddleware'
import helmet from 'helmet';

import { dbConfig } from "./common/models";
import { CommonRoutesConfig } from './common/common.routes.config';
import { ProducerRoutes } from './producer/producer.routes.config';
import { WineRoutes } from './wine/wine.routes.config';
import { CountryRoutes } from './country/country.routes.config';
import { RegionRoutes } from './region/region.routes.config';
import { VarietalRoutes } from './variety/variety.routes.config';
import { MasterVarietyRoutes } from './mastervarietal/mastervarietal.routes.config';


const app: express.Application = express();

// middleware


app.use(require("cors")());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(morganMiddleware)

if (process.env.NODE_ENV === "production") {            
    app.use(require("helmet")());           
    app.use(require("compression")());
}


const server: http.Server = http.createServer(app);
const PORT = 3000;
const routes: any = [];

routes.push(new ProducerRoutes(app));
routes.push(new CountryRoutes(app));
routes.push(new WineRoutes(app));
routes.push(new RegionRoutes(app));
routes.push(new VarietalRoutes(app));
routes.push(new MasterVarietyRoutes(app));

dbConfig
.sync().then(() =>{
//.authenticate().then(() =>{
    Logger.info("connected to db")
    app.listen(PORT,() =>
    {
        Logger.info(`Server running at port ${PORT}!`)
        routes.forEach((route: CommonRoutesConfig) => {
            Logger.info(`Routes configured for ${route.getName()}!`);
        });
    });
})
.catch((ex)=> {
    Logger.error(ex);
});

export default app;