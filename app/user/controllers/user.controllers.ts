import express from "express";
import { RECORD_LIMIT } from "../../common/common.middleware.config";
import { UserServices } from "../services/user.services";

export class UserControllers {

  constructor(){

  }

  async listUsers(req: express.Request, res: express.Response) {
    const userServices = UserServices.getInstance();
    const users = await userServices.list(RECORD_LIMIT,0);
    res.status(200).send(users);
  }

  async getUserById(req: express.Request, res: express.Response) {
    const userServices = UserServices.getInstance();
    const user = await userServices.readById(req.params.userId);
    res.status(200).send(user);
  }

  async getUserProfileByEmail(req: express.Request, res: express.Response) {
    const userServices = UserServices.getInstance();
    const profile = await userServices.readProfileByEmail(req.body.email);
    res.status(200).send(profile);
  }

  async createUser(req: express.Request, res: express.Response) {
    const userServices = UserServices.getInstance();
    const userId = await userServices.create(req.body);
    res.status(201).send({id: userId});
  }
  
  async patchUser(req: express.Request, res: express.Response) {
    const userServices = UserServices.getInstance();
    const user = await userServices.patchById(req.body);
    res.status(204).send(``);
  }

  async putUser(req: express.Request, res: express.Response) {
    const userServices = UserServices.getInstance();
    const user = await userServices.updateById(req.body);
    res.status(204).send(``);
  }

  async removeUser(req: express.Request, res: express.Response) {
    const userServices = UserServices.getInstance();
    const user = await userServices.deleteById(req.params.userId);
    res.status(204).send(``);
  }
}
