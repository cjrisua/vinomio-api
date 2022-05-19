import { dbConfig, Role } from "../../common/models"
import { RoleFactory } from "../../common/models/roles.model"
import { QueryTypes } from "sequelize";
import { IFilter } from "../../common/interface/filter.interface";

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

    async roleCount(){
        const query:string = 'SELECT COUNT("Roles"."id") FROM "Roles"';
        const result:any =  await dbConfig.query(query,{ raw: true,type: QueryTypes.SELECT,})
        return +result[0].count;
    }
    
    async addRole(roleFields: any) {
        const role = await Role.create(roleFields);
        return role.id;
    }

    async listRoles(limit: number = 25, page: number = 0, filter:IFilter){
        //SELECT * FROM table_name where enum_column::text ILIKE
        const roles = await Role.findAll({ 
            //where:filter.where, 
            offset: page, 
            limit: limit, 
            order: [['id', 'ASC']] } )
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
 