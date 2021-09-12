import * as dotenv from 'dotenv';
dotenv.config()
import bodyParser from "body-parser";
import express from 'express';

import Logger from "./lib/logger";
import morganMiddleware from './config/morganMiddleware'


import { dbConfig } from "./common/models";
import * as http from 'http';

import { CommonRoutesConfig } from './common/common.routes.config';
import { ProducersRoutes } from './producers/producers.routes.config';


const app: express.Application = express();

app.use(morganMiddleware)


const server: http.Server = http.createServer(app);
const PORT = 3000;
const routes: any = [];

routes.push(new ProducersRoutes(app));

if (process.env.NODE_ENV === "production") {            
    app.use(require("helmet")());           
    app.use(require("compression")());
  } else {
     app.use(require("cors")());
}

dbConfig
.authenticate().then(() =>{
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

