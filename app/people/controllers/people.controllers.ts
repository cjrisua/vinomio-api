import express from "express";
import { filterByKey, FilterQueryParamFactory, RECORD_LIMIT } from "../../common/common.middleware.config";
import { PeopleServices } from "../services/people.services";
import { PeopleQueryAttributes } from "../types/people.qparam";

export class PeopleControllers {

  constructor(){

  }

  async listPeople(req: express.Request, res: express.Response) {
    const services = PeopleServices.getInstance();
    const factory = new FilterQueryParamFactory();
    const filterConfig = factory.create(PeopleQueryAttributes);
    const result = await services.list(RECORD_LIMIT,0, filterByKey(req,filterConfig));
    res.status(200).send({
      count:+req.body.count,
      pages:+req.body.pages,
      rows:result
    });
  }

  async getPeopleById(req: express.Request, res: express.Response) {
    const peopleServices = PeopleServices.getInstance();
    const people = await peopleServices.readById(req.params.peopleId);
    res.status(200).send(people);
  }

  async createPeople(req: express.Request, res: express.Response) {
    const peopleServices = PeopleServices.getInstance();
    const peopleId = await peopleServices.create(req.body);
    res.status(201).send({id: peopleId});
  }
  
  async patchPeople(req: express.Request, res: express.Response) {
    const peopleServices = PeopleServices.getInstance();
    const people = await peopleServices.patchById(req.body);
    res.status(204).send(``);
  }

  async putPeople(req: express.Request, res: express.Response) {
    const peopleServices = PeopleServices.getInstance();
    const people = await peopleServices.updateById(req.body);
    res.status(204).send(``);
  }

  async removePeople(req: express.Request, res: express.Response) {
    const peopleServices = PeopleServices.getInstance();
    const people = await peopleServices.deleteById(req.params.peopleId);
    res.status(204).send(``);
  }
}
