import { dbConfig, People } from "../../common/models"
import { PeopleFactory } from "../../common/models/people.model"
import * as shortUUID from "short-uuid";

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

    async addPeople(peopleFields: any) {
        const people = await People.create(peopleFields);
        return people.id;
    }

    async listPeople(limit: number = 25, page: number = 0){
        const people = await People.findAll({ offset: page, limit: limit } )
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
 