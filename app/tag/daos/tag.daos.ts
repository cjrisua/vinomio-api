import { dbConfig, Tag } from "../../common/models"
import { TagFactory } from "../../common/models/tags.model"
import * as shortUUID from "short-uuid";

export class TagDaos {

    private static Tag = TagFactory(dbConfig)
    private static instance: TagDaos;


    constructor(){}
    
    public static getInstance() {
        if (!this.instance) {
            this.instance = new TagDaos();
        }
        return this.instance;
    }

    async addTag(tagFields: any) {
        const tag = await Tag.create(tagFields);
        return tag.id;
    }

    async listTags(limit: number = 25, page: number = 0){
        const tags = await Tag.findAll({ offset: page, limit: limit } )
        return tags;
    }
    
    async removeTagById(tagId: string){
        const tags = await Tag.destroy({where: {id: tagId} })
        return tags;
    }

    async getTagBySlug(slug: string){
        return Tag.findOne({where: {slug: slug}});
    }

    async getTagById(tagId: string) {
        return Tag.findOne({where: {id: tagId} });
    }

    async patchTag(tagFields: any) {
        console.log(JSON.stringify(tagFields))
        let tag: any = await Tag.findOne({where: {id: tagFields.id}});
        if(tag){
            for (let i in tagFields) {
                tag[i] = tagFields[i];
            }
            return await tag.save()
        }
    }
}
 