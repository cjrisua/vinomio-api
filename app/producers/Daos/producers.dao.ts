import { dbConfig } from "../../common/models"
import { ProducerFactory } from "../../common/models/producers.model"

export class ProducerDao {

    //producer = ProducerFactory(dbConfig)
    private static instance: ProducerDao;


    constructor(){}
    
    public static getInstance() {
        if (!this.instance) {
            this.instance = new ProducerDao();
        }
        return this.instance;
    }

    async listProducers(limit: number = 25, page: number = 0){
        return ProducerFactory(dbConfig).findAll();
    }
}
 