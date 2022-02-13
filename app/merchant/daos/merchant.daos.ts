import { dbConfig, Merchant } from "../../common/models"
import { MerchantFactory } from "../../common/models/merchants.model"
import * as shortUUID from "short-uuid";
import { IFilter } from "../../common/interface/filter.interface";

export class MerchantDaos {

    private static Merchant = MerchantFactory(dbConfig)
    private static instance: MerchantDaos;


    constructor(){}
    
    public static getInstance() {
        if (!this.instance) {
            this.instance = new MerchantDaos();
        }
        return this.instance;
    }

    async addMerchant(merchantFields: any) {
        const merchant = await Merchant.create(merchantFields);
        return merchant.id;
    }

    async listMerchants(limit: number = 25, page: number = 0, filter: IFilter){
        console.log(filter)
        const merchants = await Merchant.findAll(
            { 
                where: filter.where, 
                offset: page, limit: limit 
            })
        return merchants;
    }
    
    async removeMerchantById(merchantId: string){
        const merchants = await Merchant.destroy({where: {id: merchantId} })
        return merchants;
    }

    async getMerchantBySlug(slug: string){
        return Merchant.findOne({where: {slug: slug}});
    }

    async getMerchantById(merchantId: number) {
        return Merchant.findOne({where: {id: merchantId} });
    }

    async patchMerchant(merchantFields: any) {
        console.log(JSON.stringify(merchantFields))
        let merchant: any = await Merchant.findOne({where: {id: merchantFields.id}});
        if(merchant){
            for (let i in merchantFields) {
                merchant[i] = merchantFields[i];
            }
            return await merchant.save()
        }
    }
}
 