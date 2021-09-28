import express from "express";
import Logger from "../lib/logger";

export class CommonMiddlewareConfig{

    public static processValidationError(error: any, res: express.Response){
        const { details } = error; 
        const message = details.map((i: { message: any; }) => i.message).join(',');
        Logger.error(`error ${message}`); 
        res.status(422).json({ error: message })
    }
}