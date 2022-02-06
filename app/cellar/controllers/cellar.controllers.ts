import express from "express";
import { CellarServices } from "../services/cellar.services";

export class CellarControllers {

  constructor(){

  }

  async listCellars(req: express.Request, res: express.Response) {
    const cellarServices = CellarServices.getInstance();
    const cellars = await cellarServices.list(100,0);
    res.status(200).send(cellars);
  }

  async getCellarById(req: express.Request, res: express.Response) {
    const cellarServices = CellarServices.getInstance();
    const cellar = await cellarServices.readById(req.params.cellarId);
    res.status(200).send(cellar);
  }

  async createCellar(req: express.Request, res: express.Response) {
    const cellarServices = CellarServices.getInstance();
    const cellarId = await cellarServices.create(req.body);
    res.status(201).send({});
  }
  
  async patchCellar(req: express.Request, res: express.Response) {
    const cellarServices = CellarServices.getInstance();
    const cellar = await cellarServices.patchById(req.body);
    res.status(204).send(``);
  }

  async putCellar(req: express.Request, res: express.Response) {
    const cellarServices = CellarServices.getInstance();
    const cellar = await cellarServices.updateById(req.body);
    res.status(204).send(``);
  }

  async removeCellar(req: express.Request, res: express.Response) {
    const cellarServices = CellarServices.getInstance();
    const cellar = await cellarServices.deleteById(req.params.cellarId);
    res.status(204).send(``);
  }
}
