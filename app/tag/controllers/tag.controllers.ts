import express from "express";
import { TagServices } from "../services/tag.services";

export class TagControllers {

  constructor(){

  }

  async listTags(req: express.Request, res: express.Response) {
    const tagServices = TagServices.getInstance();
    const tags = await tagServices.list(100,0);
    res.status(200).send(tags);
  }

  async getTagById(req: express.Request, res: express.Response) {
    const tagServices = TagServices.getInstance();
    const tag = await tagServices.readById(req.params.tagId);
    res.status(200).send(tag);
  }

  async createTag(req: express.Request, res: express.Response) {
    const tagServices = TagServices.getInstance();
    const tagId = await tagServices.create(req.body);
    res.status(201).send({id: tagId});
  }
  
  async patchTag(req: express.Request, res: express.Response) {
    const tagServices = TagServices.getInstance();
    const tag = await tagServices.patchById(req.body);
    res.status(204).send(``);
  }

  async putTag(req: express.Request, res: express.Response) {
    const tagServices = TagServices.getInstance();
    const tag = await tagServices.updateById(req.body);
    res.status(204).send(``);
  }

  async removeTag(req: express.Request, res: express.Response) {
    const tagServices = TagServices.getInstance();
    const tag = await tagServices.deleteById(req.params.tagId);
    res.status(204).send(``);
  }
}
