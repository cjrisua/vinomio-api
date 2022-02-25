import { dbConfig, AllocationEventOffer } from "../../common/models"
import { AllocationEventOfferFactory } from "../../common/models/allocationeventoffers.model"
import * as shortUUID from "short-uuid";

export class AllocationEventOfferDaos {

    private static AllocationEventOffer = AllocationEventOfferFactory(dbConfig)
    private static instance: AllocationEventOfferDaos;


    constructor(){}
    
    public static getInstance() {
        if (!this.instance) {
            this.instance = new AllocationEventOfferDaos();
        }
        return this.instance;
    }

    async addAllocationEventOffer(AllocationEventOfferFields: any) {
        const allocationEventOffer = await AllocationEventOffer.create(AllocationEventOfferFields);
        return allocationEventOffer.id;
    }

    async listAllocationEventOffers(limit: number = 25, page: number = 0){
        const AllocationEventOffers = await AllocationEventOffer.findAll({ offset: page, limit: limit } )
        return AllocationEventOffers;
    }
    
    async removeAllocationEventOfferById(AllocationEventOfferId: string){
        const AllocationEventOffers = await AllocationEventOffer.destroy({where: {id: AllocationEventOfferId} })
        return AllocationEventOffers;
    }

    async getAllocationEventOfferBySlug(slug: string){
        return AllocationEventOffer.findOne({where: {slug: slug}});
    }

    async getAllocationEventOfferById(AllocationEventOfferId: string) {
        return AllocationEventOffer.findOne({where: {id: AllocationEventOfferId} });
    }

    async patchAllocationEventOffer(AllocationEventOfferFields: any) {
        console.log(JSON.stringify(AllocationEventOfferFields))
        let allocationEventOffer: any = await AllocationEventOffer.findOne({where: {id: AllocationEventOfferFields.id}});
        if(allocationEventOffer){
            for (let i in AllocationEventOfferFields) {
                allocationEventOffer[i] = AllocationEventOfferFields[i];
            }
            return await allocationEventOffer.save()
        }
    }
}
 