import express from "express";
import { RECORD_LIMIT } from "../../common/common.middleware.config";
import { RoleServices } from "../services/role.services";

export class RoleControllers {

  constructor(){

  }

  async listRoles(req: express.Request, res: express.Response) {
    const roleServices = RoleServices.getInstance();
    const roles = await roleServices.list(RECORD_LIMIT,0);
    res.status(200).send(roles);
  }

  async getRoleById(req: express.Request, res: express.Response) {
    const roleServices = RoleServices.getInstance();
    const role = await roleServices.readById(req.params.roleId);
    res.status(200).send(role);
  }

  async createRole(req: express.Request, res: express.Response) {
    const roleServices = RoleServices.getInstance();
    const roleId = await roleServices.create(req.body);
    res.status(201).send({id: roleId});
  }
  
  async patchRole(req: express.Request, res: express.Response) {
    const roleServices = RoleServices.getInstance();
    const role = await roleServices.patchById(req.body);
    res.status(204).send(``);
  }

  async putRole(req: express.Request, res: express.Response) {
    const roleServices = RoleServices.getInstance();
    const role = await roleServices.updateById(req.body);
    res.status(204).send(``);
  }

  async removeRole(req: express.Request, res: express.Response) {
    const roleServices = RoleServices.getInstance();
    const role = await roleServices.deleteById(req.params.roleId);
    res.status(204).send(``);
  }
}
