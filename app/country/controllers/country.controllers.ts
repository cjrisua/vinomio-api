import express from "express";
import { filterByKey, filterByKeyFindAll, FilterQueryParamFactory, RECORD_LIMIT } from "../../common/common.middleware.config";
import { CountryServices } from "../services/country.services";
import { CountryQueryAttributes } from "../types/country.qparam";

export class CountryControllers {

  constructor(){

  }

  async listCountries(req: express.Request, res: express.Response) {
    const services = CountryServices.getInstance();
    const factory = new FilterQueryParamFactory();
    const filterConfig = factory.create(CountryQueryAttributes);
    const result = await services.list(RECORD_LIMIT,0, filterByKey(req,filterConfig));
    res.status(200).send({
      count:+req.body.count,
      pages:+req.body.pages,
      rows:result
    });
  }

  async getCountryById(req: express.Request, res: express.Response) {
    const countryServices = CountryServices.getInstance();
    const country = await countryServices.readById(req.params.countryId);
    res.status(200).send(country);
  }

  async createCountry(req: express.Request, res: express.Response) {
    const countryServices = CountryServices.getInstance();
    const countryId = await countryServices.create(req.body);
    res.status(201).send({id: countryId});
  }
  
  async patchCountry(req: express.Request, res: express.Response) {
    const countryServices = CountryServices.getInstance();
    const country = await countryServices.patchById(req.body);
    res.status(204).send(``);
  }

  async putCountry(req: express.Request, res: express.Response) {
    const countryServices = CountryServices.getInstance();
    const country = await countryServices.updateById(req.body);
    res.status(204).send(``);
  }

  async removeCountry(req: express.Request, res: express.Response) {
    const countryServices = CountryServices.getInstance();
    const country = await countryServices.deleteById(req.params.countryId);
    res.status(204).send(``);
  }
}
