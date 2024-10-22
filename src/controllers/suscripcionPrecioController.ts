import { SuscripcionRepository } from "../repository/suscripcionRepository";
import { Request, Response } from "express";
import { SuscripcionPrecioRepository } from "../repository/suscripcionPrecioRepository";
import { MongoError, MongoServerError } from "mongodb";

export class SuscripcionPrecioController{
    static async GetAll(req: Request, res: Response){
        try {
            const precios = await SuscripcionPrecioRepository.GetAll();
            if (precios) {
                return res.status(200).json(precios);
            }
            return res.status(404).send("No se encontró la suscripcion.");
        } catch (error) {
            console.error("Error al obtener suscripcion", error)
            return res.status(500).send("Error interno del servidor.");
        }
    }

    static async GetAllOfOne(req: Request, res: Response){
        const suscripcionId = req.params.suscripcionId;
        try {
            const suscripcion = await SuscripcionRepository.GetOne(suscripcionId);
            if (suscripcion) {
                const prices = await SuscripcionPrecioRepository.GetAllOfOne(suscripcionId);
                return res.status(200).json(prices);
            }
            return res.status(404).send("No se encontró la suscripcion.");
        } catch (error) {
            console.error("Error al obtener suscripcion", error)
            return res.status(500).send("Error interno del servidor.");
        }
    }

    static async GetOne(req: Request, res: Response){
        const id = req.params.id;
        try {
            const existPrice = await SuscripcionPrecioRepository.GetOne(id);
            if (existPrice) {
                return res.status(200).json(existPrice);
            }
            return res.status(404).send("No se encontro el precio en la base de datos");
        } catch (error) {
            console.error("Error al obtener suscripcion", error)
            return res.status(500).send("Error interno del servidor.");
        }
    }
    
    static async Create(req: Request, res: Response){
        const urlSuscripcionId = req.params.suscripcionId;
        const validateUserInput = (req: Request):boolean => {
            const { startDate, amount, suscripcionId } = req.body;
            return startDate && amount && suscripcionId && suscripcionId == urlSuscripcionId ? true : false;
        }
        if (!validateUserInput(req)) {
            return res.status(400).send("Datos de entrada invalidos");
        }
        const { startDate, amount, suscripcionId } = req.body;
        try {
            let suscripcion = await SuscripcionRepository.GetOne(suscripcionId);
            if (suscripcion) {
                const result = await SuscripcionPrecioRepository.Create(startDate, amount, suscripcion);
                if (result) {
                    return res.status(201).json(result);
                }
            }
            return res.status(404).send("No se encontró la suscripcion.");
        } catch (error) {
            console.error("Error al obtener suscripcion: ", error);
            if (error instanceof MongoError && error.code == 11000) {
                return res.status(406).send("Dos Precios tienen la misma fecha.");
            }
            return res.status(500).send("Error interno del servidor.");
        }
    }

    static async Delete(req: Request, res: Response){
        try {
            const { id } = req.params;
            const onePrice = await SuscripcionPrecioRepository.GetOne(id);
            if (onePrice) {
                const result = await SuscripcionPrecioRepository.Delete(id);
                if (result) {
                    return res.status(202).send("Precio Borrado.");
                }
            }
            return res.status(404).send("No se encontró el Precio.");
        } catch (error) {
            console.error("Error al eliminar el Precio:", error);
            return res.status(500).send("[Error] Delete SubscriptionPrice");
        }

    }
}