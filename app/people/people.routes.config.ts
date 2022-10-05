import {CommonRoutesConfig,configureRoutes,} from "../common/common.routes.config";
import {PeopleControllers } from "./controllers/people.controllers";
import {PeopleMiddleware} from "./middleware/people.middleware";
import express from "express";

export class PeopleRoutes
  extends CommonRoutesConfig
  implements configureRoutes
{
  constructor(app: express.Application) {
    super(app, "PeopleRoute");
    this.configureRoutes();
  }

  configureRoutes() {
    const peopleControllers = new PeopleControllers();
    const peopleMiddleware = PeopleMiddleware.getInstance();

    this.app.get("/api/people", [
        peopleControllers.listPeople
    ]);
    this.app.post("/api/people", [
        peopleControllers.createPeople
    ]);
    this.app.put(`/api/people/:peopleId`, [
        peopleMiddleware.validatePeopleExists,
        peopleMiddleware.extractPeopleId,
        peopleControllers.putPeople
    ]);
    this.app.patch(`/api/people/:peopleId`, [
        peopleMiddleware.validatePeopleExists,
        peopleMiddleware.extractPeopleId,
        peopleControllers.patchPeople
    ]);
    this.app.delete(`/api/people/:peopleId`, [
      peopleMiddleware.validatePeopleExists,
      peopleControllers.removePeople,
    ]);
    this.app.get(`/api/people/:peopleId`, [
      peopleMiddleware.validatePeopleExists,
      peopleControllers.getPeopleById,
    ]);
  }
}
