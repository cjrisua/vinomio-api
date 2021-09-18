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
import { ProducersRoutes } from './producers/producers.routes.config';


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

routes.push(new ProducersRoutes(app));

dbConfig
//.sync().then(() =>{
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

export default app;