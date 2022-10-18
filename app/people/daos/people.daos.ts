import { dbConfig, People } from "../../common/models"
import { PeopleFactory } from "../../common/models/people.model"
import { QueryTypes } from "sequelize";

export class PeopleDaos {

    private static People = PeopleFactory(dbConfig)
    private static instance: PeopleDaos;


    constructor(){}
    
    public static getInstance() {
        if (!this.instance) {
            this.instance = new PeopleDaos();
        }
        return this.instance;
    }
    async peopleCount(){
        const query:string = 'SELECT COUNT("People"."id") FROM "People"';
        const result:any =  await dbConfig.query(query,{ raw: true,type: QueryTypes.SELECT,})
        return +result[0].count;
    }
    async addPeople(peopleFields: any) {
        const people = await People.create(peopleFields);
        return people.id;
    }

    async listPeople(limit: number = 25, page: number = 0, filter:any){
        //page offser
        filter.offset = page;
        //page limit
        filter.limit = limit;
        const people = await People.findAll(filter)
        return people;
    }
    
    async removePeopleById(peopleId: string){
        const people = await People.destroy({where: {id: peopleId} })
        return people;
    }

    async getPeopleById(peopleId: string) {
        return People.findOne({where: {id: peopleId} });
    }

    async patchPeople(peopleFields: any) {
        console.log(JSON.stringify(peopleFields))
        let people: any = await People.findOne({where: {id: peopleFields.id}});
        if(people){
            for (let i in peopleFields) {
                people[i] = peopleFields[i];
            }
            return await people.save()
        }
    }
}
 