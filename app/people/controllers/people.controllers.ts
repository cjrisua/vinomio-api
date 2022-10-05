import express from "express";
import { PeopleServices } from "../services/people.services";

export class PeopleControllers {

  constructor(){

  }

  async listPeople(req: express.Request, res: express.Response) {
    const peopleServices = PeopleServices.getInstance();
    const people = await peopleServices.list(100,0);
    res.status(200).send(people);
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
