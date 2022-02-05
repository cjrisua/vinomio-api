import { Cellar, dbConfig, User } from "../../common/models"
import { CellarFactory } from "../../common/models/cellars.model"
import * as shortUUID from "short-uuid";
import { Subscriber } from "../../subscriber/types/subscriber.type";

export class CellarDaos {

    private Cellar = CellarFactory(dbConfig)
    private static instance: CellarDaos;


    constructor(){}
    
    public static getInstance() {
        if (!this.instance) {
            this.instance = new CellarDaos();
        }
        return this.instance;
    }

    async addCellar(cellarFields: any) {
        const cellar = await this.Cellar.create(cellarFields);
        if(cellarFields.owner){
            await cellar.addUsers(cellarFields.owner, {
                through:{
                    role_id: 1 //Collector default value
                }});
        }
        return cellar.id;
    }

    async listCellars(limit: number = 25, page: number = 0){
        const cellars = await Cellar.findAll({ 
            offset: page, 
            limit: limit,
            include: [{
                model:User, attributes:['id','firstname','email', 'lastname','handler'],
            }]
        } )
        return cellars;
    }
    
    async removeCellarById(cellarId: string){
        const cellars = await Cellar.destroy({where: {id: cellarId} })
        return cellars;
    }

    async getCellarById(cellarId: string) {
        return Cellar.findOne({where: {id: cellarId},
            include: [{
                model:User, attributes:['id','firstname','email', 'lastname','handler'],
            }] });
    }

    async patchCellar(cellarFields: any) {
        console.log(JSON.stringify(cellarFields))
        let cellar: any = await Cellar.findOne({where: {id: cellarFields.id}});
        if(cellar){
            for (let i in cellarFields) {
                cellar[i] = cellarFields[i];
            }
            return await cellar.save()
        }
    }
}
 