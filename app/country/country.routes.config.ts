import {CommonRoutesConfig,configureRoutes,} from "../common/common.routes.config";
import {CountryControllers } from "./controllers/country.controllers";
import {CountryMiddleware} from "./middleware/country.middleware";
import express from "express";

export class CountryRoutes
  extends CommonRoutesConfig
  implements configureRoutes
{
  constructor(app: express.Application) {
    super(app, "CountriesRoute");
    this.configureRoutes();
  }

  configureRoutes() {
    const countryControllers = new CountryControllers();
    const countryMiddleware = CountryMiddleware.getInstance();

    this.app.get("/api/country", [
        countryMiddleware.validateCountryQueryParamExists,
        countryControllers.listCountries
    ]);
    this.app.post("/api/country", [
        countryControllers.createCountry
    ]);
    this.app.put(`/api/country/:countryId`, [
        countryMiddleware.validateCountryExists,
        countryMiddleware.extractCountryId,
        countryControllers.putCountry
    ]);
    this.app.patch(`/api/country/:countryId`, [
        countryMiddleware.validateCountryExists,
        countryMiddleware.extractCountryId,
        countryControllers.patchCountry
    ]);
    this.app.delete(`/api/country/:countryId`, [
      countryMiddleware.validateCountryExists,
      countryControllers.removeCountry,
    ]);
    this.app.get(`/api/country/:countryId`, [
      countryMiddleware.validateCountryExists,
      countryControllers.getCountryById,
    ]);
  }
}
