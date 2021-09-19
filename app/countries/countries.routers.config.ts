import {CommonRoutesConfig,configureRoutes,} from "../common/common.routes.config";
import {CountriesController } from "./controllers/countries.controllers";
import {CountriesMiddleware} from "./middleware/countries.middleware";
import express from "express";

export class CountriesRoutes
  extends CommonRoutesConfig
  implements configureRoutes
{
  constructor(app: express.Application) {
    super(app, "CountriesRoute");
    this.configureRoutes();
  }

  configureRoutes() {
    const countriesController = new CountriesController();
    const countriesMiddleware = CountriesMiddleware.getInstance();

    this.app.get("/api/countries", [
        countriesController.listCountries
    ]);
    this.app.post("/api/countries", [
        countriesController.createCountry
    ]);
    this.app.put(`/api/countries/:countryId`, [
        countriesMiddleware.validateCountryExists,
        countriesMiddleware.extractCountryId,
        countriesController.putCountry
    ]);
    this.app.patch(`/api/countries/:countryId`, [
        countriesMiddleware.validateCountryExists,
        countriesMiddleware.extractCountryId,
        countriesController.patchCountry
    ]);
    this.app.delete(`/api/countries/:countryId`, [
      countriesMiddleware.validateCountryExists,
      countriesController.removeCountry,
    ]);
    this.app.get(`/api/countries/:countryId`, [
      countriesMiddleware.validateCountryExists,
      countriesController.getCountryById,
    ]);
  }
}
