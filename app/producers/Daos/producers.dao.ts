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
        const producers = await Producer.findAll();
        return producers;
    }
}
 