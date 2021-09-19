import express from "express";
import { CountryService } from "../services/countries.services";

export class CountriesController {

  constructor(){

  }

  async listCountries(req: express.Request, res: express.Response) {
    const countryService = CountryService.getInstance();
    const countries = await countryService.list(100,0);
    res.status(200).send(countries);
  }

  async getCountryById(req: express.Request, res: express.Response) {
    const countryService = CountryService.getInstance();
    const countries = await countryService.readById(req.params.countryId);
    res.status(200).send(countries);
  }

  async createCountry(req: express.Request, res: express.Response) {
    const countryService = CountryService.getInstance();
    const countryId = await countryService.create(req.body);
    res.status(201).send({id: countryId});
  }
  
  async patchCountry(req: express.Request, res: express.Response) {
    let countryService = CountryService.getInstance();
    const countries = await countryService.patchById(req.body);
    res.status(204).send(``);
  }

  async putCountry(req: express.Request, res: express.Response) {
    const countryService = CountryService.getInstance();
    const countries = await countryService.updateById(req.body);
    res.status(204).send(``);
  }

  async removeCountry(req: express.Request, res: express.Response) {
    const countryService = CountryService.getInstance();
    const countries = await countryService.deleteById(req.params.countryId);
    res.status(204).send(``);
  }
}
