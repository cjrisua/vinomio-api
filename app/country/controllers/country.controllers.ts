import express from "express";
import { CountryServices } from "../services/country.services";

export class CountryControllers {

  constructor(){

  }

  async listCountries(req: express.Request, res: express.Response) {
    const countryServices = CountryServices.getInstance();
    const countries = await countryServices.list(100,0);
    res.status(200).send(countries);
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
