import * as sequelize from 'sequelize';
import { ProducerFactory } from './producers.model';
import { CountryFactory } from './countries.model';
import { WineFactory } from './wines.model';
import { RegionFactory } from './regions.model';
import * as config from '../../config/config.json'
import { VarietyFactory } from './varieties.model';
import { MasterVarietalFactory } from './mastervarietals.model';
import exp from 'constants';
import { VintageFactory } from './vintages.model';
import { UserFactory } from './users.model';
import { RoleFactory } from './roles.model';
import { CollectionFactory } from './collections.model';
import { CellarFactory } from './cellars.model';
import { MerchantFactory } from './merchants.model';
import { AllocationEventFactory } from './allocationevents.model';
import { AllocationFactory } from './allocations.model';
import { CollectionEventFactory } from './collectionevents.model';
import { AllocationEventOfferFactory } from './allocationeventoffers.model';
import { ReviewFactory } from './reviews.model';
import { PeopleFactory } from './people.model';
import { TagFactory } from './tags.model';

let sequelize_info = null;
sequelize_info = new sequelize.Sequelize(`postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`)

export const dbConfig = sequelize_info;
export const Producer = ProducerFactory(dbConfig);
export const Country = CountryFactory(dbConfig);
export const Wine = WineFactory(dbConfig);
export const Region = RegionFactory(dbConfig);
export const Variety = VarietyFactory(dbConfig);
export const MasterVarietal = MasterVarietalFactory(dbConfig);
export const Vintage = VintageFactory(dbConfig);
export const User = UserFactory(dbConfig);
export const Role = RoleFactory(dbConfig);
export const Collection = CollectionFactory(dbConfig);
export const Cellar = CellarFactory(dbConfig);
export const Merchant = MerchantFactory(dbConfig);
export const Allocation =  AllocationFactory(dbConfig);
export const AllocationEvent = AllocationEventFactory(dbConfig)
export const CollectionEvent = CollectionEventFactory(dbConfig);
export const AllocationEventOffer = AllocationEventOfferFactory(dbConfig)
export const Review = ReviewFactory(dbConfig)
export const People = PeopleFactory(dbConfig)
export const Tag = TagFactory(dbConfig)
