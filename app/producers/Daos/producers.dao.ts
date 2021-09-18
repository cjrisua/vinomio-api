import { dbConfig, Producer } from "../../common/models"
import { ProducerFactory } from "../../common/models/producers.model"
import * as shortUUID from "short-uuid";

export class ProducerDao {

    private static Producer = ProducerFactory(dbConfig)
    private static instance: ProducerDao;


    constructor(){}
    
    public static getInstance() {
        if (!this.instance) {
            this.instance = new ProducerDao();
        }
        return this.instance;
    }

    async addProducer(producerFields: any) {
        const producer = await Producer.create(producerFields);
        return producer.id;
    }

    async listProducers(limit: number = 25, page: number = 0){
        const producers = await Producer.findAll({ offset: page, limit: limit } )
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
 