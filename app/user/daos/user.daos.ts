import { dbConfig, User } from "../../common/models"
import { UserFactory } from "../../common/models/users.model"
import * as shortUUID from "short-uuid";
import bcrypt from "bcrypt"

export class UserDaos {

    private static User = UserFactory(dbConfig)
    private static instance: UserDaos;


    constructor(){}
    
    public static getInstance() {
        if (!this.instance) {
            this.instance = new UserDaos();
        }
        return this.instance;
    }

    async addUser(userFields: any) {

        //let dbUser!:number; 
        console.log(userFields)
        /*
        bcrypt.hash(userFields.password, 10).then(async (hash) => {
            userFields.password = hash;
            const dbuser = await User.create(userFields);
            return dbuser.id;
        })
        .then((id) => dbUser = id);*/
        const user = await User.create(userFields);
        return user.id;
    }

    async listUsers(limit: number = 25, page: number = 0){
        const users = await User.findAll({ offset: page, limit: limit } )
        return users;
    }
    
    async removeUserById(userId: string){
        const users = await User.destroy({where: {email: userId} })
        return users;
    }

    //async getUserBySlug(slug: string){
    //    return User.findOne({where: {slug: slug}});
    //}

    async getUserById(userId: string) {
        return User.findOne({where: {id: userId} });
    }
    async getUserByEmail(email: string) {
        return User.findOne({where: {email: email} });
    }

    async patchUser(userFields: any) {
        console.log(JSON.stringify(userFields))
        let user: any = await User.findOne({where: {id: userFields.id}});
        if(user){
            for (let i in userFields) {
                user[i] = userFields[i];
            }
            return await user.save()
        }
    }
}
 