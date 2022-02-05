import { CRUD } from "../../common/interface/crud.interface";
import Logger from "../../lib/logger";
import { RoleDaos } from "../daos/role.daos";

export class RoleServices implements CRUD{
    private static instance: RoleServices;

    constructor() {
        
    }

    static getInstance(): RoleServices {
        if (!RoleServices.instance) {
            RoleServices.instance = new RoleServices();
        }
        return RoleServices.instance;
    }

    create(resource: any){
        return RoleDaos.getInstance().addRole(resource);
    }
    deleteById(resourceId: any){
        return RoleDaos.getInstance().removeRoleById(resourceId);
    }
    list(limit: number, page: number){
        return RoleDaos.getInstance().listRoles(limit, page);
    }
    patchById(resource: any){
        return RoleDaos.getInstance().patchRole(resource);
    }
    readById(resourceId: any){
        return RoleDaos.getInstance().getRoleById(resourceId);
    }
    updateById(resource: any){
        return RoleDaos.getInstance().patchRole(resource);
    }
}