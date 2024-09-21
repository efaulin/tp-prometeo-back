import { SuscripcionRepository } from "../repository/suscripcionRepository.js";
import { Request, Response } from "express";
import { Suscripcion, SuscripcionPrecio, SuscripcionPrecioModel } from "../schemas/suscripcionSchema.js";
import { SuscripcionPrecioRepository } from "../repository/suscripcionPrecioRepository.js";

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
                await suscripcion.populate("prices");
                return res.status(200).json(suscripcion.prices);
            }
            return res.status(404).send("No se encontró la suscripcion.");
        } catch (error) {
            console.error("Error al obtener suscripcion", error)
            return res.status(500).send("Error interno del servidor.");
        }
    }

    static async GetOne(req: Request, res: Response){
        const suscripcionId = req.params.suscripcionId;
        const id = req.params.id;
        try {
            let suscripcion = await SuscripcionRepository.GetOne(suscripcionId);
            if (suscripcion) {
                const existPrice = suscripcion.prices!.find(prc => prc._id.toString() == id);
                if (existPrice) {
                    const result = await SuscripcionPrecioRepository.GetOne(id);
                    if (result) {
                        return res.status(200).json(result);
                    }
                    return res.status(404).send("No se encontro el precio en la base de datos")
                }
                return res.status(404).send("No se encontro el precio en la suscripcion [" + suscripcion.type + "]");
            }
            return res.status(404).send("No se encontró la suscripcion.");
        } catch (error) {
            console.error("Error al obtener suscripcion", error)
            return res.status(500).send("Error interno del servidor.");
        }
    }
    //TODO Agregar discriminacion por error de index repetido
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
                return res.status(200).json(result);
            }
            return res.status(404).send("No se encontró la suscripcion.");
        } catch (error) {
            console.error("Error al obtener suscripcion", error)
            return res.status(500).send("Error interno del servidor.");
        }
    }

    static async Delete(req: Request, res: Response){
        try {
            const suscripcionId = req.params.suscripcionId;
            const id = req.params.id;
            const result = await SuscripcionPrecioRepository.Delete(id);
            if (result) {
                return res.status(202).send("Precio Borrado");
            }
            return res.status(404).send("No se encontró el suscripcionPrecio");
        } catch (error) {
            console.error("Error al eliminar suscripcionPrecio:", error);
            return res.status(500).send("[Error] Delete SubscriptionPrice");
        }

    }
}