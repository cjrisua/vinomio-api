import { CRUD } from "../../common/interface/crud.interface";
import Logger from "../../lib/logger";
import { UserDaos } from "../daos/user.daos";

export class UserServices implements CRUD{
    private static instance: UserServices;

    constructor() {
        
    }

    static getInstance(): UserServices {
        if (!UserServices.instance) {
            UserServices.instance = new UserServices();
        }
        return UserServices.instance;
    }

    create(resource: any){
        return UserDaos.getInstance().addUser(resource);
    }
    deleteById(resourceId: any){
        return UserDaos.getInstance().removeUserById(resourceId);
    }
    list(limit: number, page: number){
        return UserDaos.getInstance().listUsers(limit, page);
    }
    patchById(resource: any){
        return UserDaos.getInstance().patchUser(resource);
    }
    readById(resourceId: any){
        return UserDaos.getInstance().getUserById(resourceId);
    }
    readByEmail(resourceId: any){
        return UserDaos.getInstance().getUserByEmail(resourceId);
    }
    readProfileByEmail(resourceId: any){
        return UserDaos.getInstance().getProfileByEmail(resourceId);
    }
    updateById(resource: any){
        return UserDaos.getInstance().patchUser(resource);
    }
}