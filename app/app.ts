import * as dotenv from 'dotenv';
dotenv.config()

import express from 'express';
//import * as http from 'http';
// Import builtin NodeJS modules to instantiate the service
import * as https from 'https'
import * as fs from 'fs'
import * as bodyparser from 'body-parser';

import Logger from "./lib/logger";
import morganMiddleware from './config/morganMiddleware'
import helmet from 'helmet';

import { dbConfig, People } from "./common/models";
import { CommonRoutesConfig } from './common/common.routes.config';
import { ProducerRoutes } from './producer/producer.routes.config';
import { WineRoutes } from './wine/wine.routes.config';
import { CountryRoutes } from './country/country.routes.config';
import { RegionRoutes } from './region/region.routes.config';
import { VarietalRoutes } from './variety/variety.routes.config';
import { MasterVarietyRoutes } from './mastervarietal/mastervarietal.routes.config';
import { VintageRoutes } from './vintage/vintage.routes.config';
import { UserRoutes } from './user/user.routes.config';
import { AuthRoutes } from './auth/auth.routes.config';
import { RoleRoutes } from './role/role.routes.config';
import { CellarRoutes } from './cellar/cellar.routes.config';
import { CollectionRoutes } from './collection/collection.routes.config';
import { MerchantRoutes } from './merchant/merchant.routes.config';
import { AllocationRoutes } from './allocation/allocation.routes.config';
import { AllocationEventFactory } from './common/models/allocationevents.model';
import { AllocationEventRoutes } from './allocationevent/allocationevent.routes.config';
import { AllocationEventOfferRoutes } from './allocationeventoffer/allocationeventoffer.routes.config';
import { PeopleRoutes } from './people/people.routes.config';
import { ReviewRoutes } from './review/review.routes.config';
import { TagRoutes } from './tag/tag.routes.config';


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

const options = {
    key: fs.readFileSync('SSLprivatekey.key'),
    cert: fs.readFileSync('SSLcertificate.crt'),
    //rejectUnauthorized: false,
  };
  
const server: https.Server = https.createServer(options,app);
const PORT = 3000;
const routes: any = [];

routes.push(new ProducerRoutes(app));
routes.push(new CountryRoutes(app));
routes.push(new WineRoutes(app));
routes.push(new RegionRoutes(app));
routes.push(new VarietalRoutes(app));
routes.push(new MasterVarietyRoutes(app));
routes.push(new VintageRoutes(app));
routes.push(new UserRoutes(app));
routes.push(new RoleRoutes(app));
routes.push(new AuthRoutes(app));
routes.push(new CellarRoutes(app));
routes.push(new CollectionRoutes(app));
routes.push(new MerchantRoutes(app));
routes.push(new AllocationRoutes(app));
routes.push(new AllocationEventRoutes(app));
routes.push(new AllocationEventOfferRoutes(app));
routes.push(new PeopleRoutes(app));
routes.push(new ReviewRoutes(app));
routes.push(new TagRoutes(app));

dbConfig
.sync().then(() =>{
//.authenticate().then(() =>{
    Logger.info("build_2022_01_02_05_07_PM")
    Logger.info("connected to db")
    server.listen(PORT,() =>
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