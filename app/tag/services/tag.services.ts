import { CRUD } from "../../common/interface/crud.interface";
import Logger from "../../lib/logger";
import { TagDaos } from "../daos/tag.daos";

export class TagServices implements CRUD{
    private static instance: TagServices;

    constructor() {
        
    }

    static getInstance(): TagServices {
        if (!TagServices.instance) {
            TagServices.instance = new TagServices();
        }
        return TagServices.instance;
    }

    create(resource: any){
        return TagDaos.getInstance().addTag(resource);
    }
    deleteById(resourceId: any){
        return TagDaos.getInstance().removeTagById(resourceId);
    }
    list(limit: number, page: number){
        return TagDaos.getInstance().listTags(limit, page);
    }
    patchById(resource: any){
        return TagDaos.getInstance().patchTag(resource);
    }
    readById(resourceId: any){
        return TagDaos.getInstance().getTagById(resourceId);
    }
    updateById(resource: any){
        return TagDaos.getInstance().patchTag(resource);
    }
}