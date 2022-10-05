import {CommonRoutesConfig,configureRoutes,} from "../common/common.routes.config";
import {TagControllers } from "./controllers/tag.controllers";
import {TagMiddleware} from "./middleware/tag.middleware";
import express from "express";

export class TagRoutes
  extends CommonRoutesConfig
  implements configureRoutes
{
  constructor(app: express.Application) {
    super(app, "TagsRoute");
    this.configureRoutes();
  }

  configureRoutes() {
    const tagControllers = new TagControllers();
    const tagMiddleware = TagMiddleware.getInstance();

    this.app.get("/api/tag", [
        tagControllers.listTags
    ]);
    this.app.post("/api/tag", [
        tagControllers.createTag
    ]);
    this.app.put(`/api/tag/:tagId`, [
        tagMiddleware.validateTagExists,
        tagMiddleware.extractTagId,
        tagControllers.putTag
    ]);
    this.app.patch(`/api/tag/:tagId`, [
        tagMiddleware.validateTagExists,
        tagMiddleware.extractTagId,
        tagControllers.patchTag
    ]);
    this.app.delete(`/api/tag/:tagId`, [
      tagMiddleware.validateTagExists,
      tagControllers.removeTag,
    ]);
    this.app.get(`/api/tag/:tagId`, [
      tagMiddleware.validateTagExists,
      tagControllers.getTagById,
    ]);
  }
}
