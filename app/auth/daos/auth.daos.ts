
import { dbConfig,User } from "../../common/models";
import { UserFactory } from "../../common/models/users.model";
import Logger from "../../lib/logger";

export class AuthDaos {

    //private static User = UserFactory(dbConfig)
    private static instance: AuthDaos;

    constructor(){}
    
    public static getInstance() {
        if (!this.instance) {
            this.instance = new AuthDaos();
        }
        return this.instance;
    }

    async get(user:any){
        const userModel = await User.findOne({where: { email : user.email}});
        return userModel;
    }
}
 