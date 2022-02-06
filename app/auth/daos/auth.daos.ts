
import { dbConfig,User } from "../../common/models";
import { UserFactory } from "../../common/models/users.model";

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
        //console.log(user.email)
        const users = await User.findOne({where: { email : user.email}});
        return users;
    }
}
 