import { dbConfig, User } from "../../common/models"
import { UserFactory } from "../../common/models/users.model"
import * as shortUUID from "short-uuid";
import bcrypt from "bcrypt"
import { Subscriber } from "../../subscriber/types/subscriber.type";
import { QueryTypes } from "sequelize";

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
        const users = await User.findAll({ 
            offset: page, 
            limit: limit,
        })
        return users;
    }
    
    async removeUserById(userId: string){
        const users = await User.destroy({where: {email: userId} })
        return users;
    }
    async getUserById(userId: string) {
        return User.findOne({where: {id: userId} });
    }
    async getUserByEmail(email: string) {
        return User.findOne({where: {email: email} });
    }
    async getProfileByEmail(email: string) {

        const profile_query:string = `SELECT 
            "U"."id",
            "U"."email",
            "U"."firstname",
            "U"."lastname",
            "S"."cellar_id",
            "C"."vintageId",
            "C"."statusId"
            FROM "Users" as "U"
            LEFT OUTER JOIN "Subscribers" as "S" on "S"."user_id" = "U"."id" and "S"."role_id" = 1
            LEFT OUTER JOIN "Collections" as "C" on "C"."cellarId" = "S"."cellar_id"
            WHERE email = :email
            `;
            const r:any =  await dbConfig.query(profile_query, {
                replacements: { email: email },
                raw: true,
                type: QueryTypes.SELECT,
              }).then((m:any) =>  { return {
                  "id":m[0]?.id, 
                  "firstname":m[0]?.firstname,
                  "lastname":m[0]?.lastname,
                  "cellar_id":m[0]?.cellar_id,
                  "email":m[0]?.email
                } })

              return r 
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
 

            