import { dbConfig, Producer } from "../../common/models"
import { IFilter } from "../../common/interface/filter.interface";
import Logger from "../../lib/logger";
import { QueryTypes } from "sequelize";

export class ProducerDaos {

    //private static Producer = ProducerFactory(dbConfig)
    private static instance: ProducerDaos;


    constructor(){}
    
    public static getInstance() {
        if (!this.instance) {
            this.instance = new ProducerDaos();
        }
        return this.instance;
    }
    async producerCount(){
        const query:string = 'SELECT COUNT("Producers"."id") FROM "Producers"';
        const result:any =  await dbConfig.query(query,{ raw: true,type: QueryTypes.SELECT,})
        return +result[0].count;
    }
    async addProducer(producerFields: any) {
        const producer = await Producer.create(producerFields);
        return producer.id;
    }

    async listProducers(limit: number = 25, page: number = 0, filter:IFilter){
        Logger.debug(filter)
        const producers = await Producer.findAll({ 
            where:filter.where, 
            offset: page, 
            limit: limit, 
            order: [['name', 'ASC']] } )
        return producers;
    }
    
    async removeProducerById(producerId: string){
        const producers = await Producer.destroy({where: {id: producerId} })
        return producers;
    }

    async getProducerBySlug(slug: string){
        return Producer.findOne({where: {slug: slug}});
    }

    async getProducerById(producerId: string) {
        return Producer.findOne({where: {id: producerId} });
    }

    async patchProducer(producerFields: any) {
        console.log(JSON.stringify(producerFields))
        let producer: any = await Producer.findOne({where: {id: producerFields.id}});
        if(producer){
            for (let i in producerFields) {
                producer[i] = producerFields[i];
            }
            return await producer.save()
        }
    }
}
 