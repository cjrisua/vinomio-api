import { CRUD } from "../../common/interface/crud.interface";
import Logger from "../../lib/logger";
import { AuthDaos } from "../daos/auth.daos";

export class AuthServices {
    private static instance: AuthServices;

    constructor() {
        
    }

    static getInstance(): AuthServices {
        if (!AuthServices.instance) {
            AuthServices.instance = new AuthServices();
        }
        return AuthServices.instance;
    }
    getUsername(resource: any){
        return AuthDaos.getInstance().get(resource);
    }
}