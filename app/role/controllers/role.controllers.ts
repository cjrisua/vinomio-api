import express from "express";
import { filterByKey, FilterQueryParamFactory, RECORD_LIMIT } from "../../common/common.middleware.config";
import { RoleServices } from "../services/role.services";
import { RoleQueryAttributes } from "../types/role.qparam";

export class RoleControllers {

  constructor(){

  }

  async listRoles(req: express.Request, res: express.Response) {
    const service = RoleServices.getInstance();
    const factory = new FilterQueryParamFactory();
    const filterConfig = factory.create(RoleQueryAttributes);
    const result = await service.list(RECORD_LIMIT,req.body.offset, filterByKey(req,filterConfig));
    res.status(200).send({
      count:+req.body.count,
      pages:+req.body.pages,
      rows:result
    });
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
