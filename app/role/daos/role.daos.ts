import { dbConfig, Role } from "../../common/models"
import { RoleFactory } from "../../common/models/roles.model"
import * as shortUUID from "short-uuid";

export class RoleDaos {

    private static Role = RoleFactory(dbConfig)
    private static instance: RoleDaos;


    constructor(){}
    
    public static getInstance() {
        if (!this.instance) {
            this.instance = new RoleDaos();
        }
        return this.instance;
    }

    async addRole(roleFields: any) {
        const role = await Role.create(roleFields);
        return role.id;
    }

    async listRoles(limit: number = 25, page: number = 0){
        const roles = await Role.findAll({ offset: page, limit: limit } )
        return roles;
    }
    
    async removeRoleById(roleId: string){
        const roles = await Role.destroy({where: {id: roleId} })
        return roles;
    }

    async getRoleBySlug(slug: string){
        return Role.findOne({where: {slug: slug}});
    }

    async getRoleById(roleId: string) {
        return Role.findOne({where: {id: roleId} });
    }

    async patchRole(roleFields: any) {
        console.log(JSON.stringify(roleFields))
        let role: any = await Role.findOne({where: {id: roleFields.id}});
        if(role){
            for (let i in roleFields) {
                role[i] = roleFields[i];
            }
            return await role.save()
        }
    }
}
 