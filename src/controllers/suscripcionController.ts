import { SuscripcionRepository } from "../repository/suscripcionRepository";
import { Request, Response } from "express";
import { Suscripcion, SuscripcionPrecio, SuscripcionPrecioModel } from "../schemas/suscripcionSchema";

export class SuscripcionController{
    static async GetAll(req: Request, res: Response){
        try {
            const suscripciones = await SuscripcionRepository.GetAll();
            if (suscripciones) {
                return res.status(200).json(suscripciones);
            } else {
                return res.status(404).send("No se encontraron suscripciones.");
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send("[Error] GetAll Subscriptions");
        }
    }

    static async GetOne(req: Request, res: Response){
        const id = req.params.id;
        try {
            const result = await SuscripcionRepository.GetOne(id);
            if (result) {
                await result.populate("prices");
                return res.status(200).json(result);
            }
            return res.status(404).send("No se encontró la suscripcion.");
        } catch (error) {
            console.error("Error al obtener suscripcion", error)
            return res.status(500).send("Error interno del servidor.");
        }
    }
    
    static async Create(req: Request, res: Response){
        const validateUserInput = (req: Request):boolean => {
            const { type } = req.body;
            return type ? true : false;
        }
        if (!validateUserInput(req)) {
            return res.status(400).send("Datos de entrada invalidos");
        }
        type partialPrice = Partial<SuscripcionPrecio>;
        const arrayPrices = new Array<partialPrice>;
        const { type, prices } = req.body;
        try {
            if (prices) {
                prices.forEach((prc: { startDate: any; amount: any; }) => {
                    const tmp : partialPrice = {
                        startDate: prc.startDate,
                        amount: prc.amount,
                    }
                    arrayPrices.push(tmp);
                });
                const control = arrayPrices.some((elemnt, index, prices) => {
                    let control = false;
                    for (let i = index + 1; i < prices.length && control == false; i++) {
                        if (elemnt.startDate! == prices[i].startDate!) { control = true }
                    }
                    return control;
                });
                if (control) {
                    return res.status(406).send("Dos Precios tienen la misma fecha.");
                }
            }
            const result = await SuscripcionRepository.Create(type, prices);
            return res.status(201).json(result);
        } catch (error) {
            console.error("Error al crear suscripcion:", error);
            return res.status(500).send("[Error] Create Subscription");
        }
    }

    static async Update(req: Request, res: Response) {
        const id = req.params.id;
        const { type } = req.body;
        // Crear un objeto con solo los campos que se han proporcionado
        const updateFields: any = {};
        if (type) updateFields.type = type;
        //Se deja de esta manera en caso de agregar mas atributos en el futuro

        try {
            const result = await SuscripcionRepository.Update(id, updateFields);
            if (result) {
                return res.status(200).json(result);
            }
            return res.status(404).send("No se encontró la suscripcion para actualizar.");
        } catch (error) {
            console.error("Error al actualizar suscripcion:", error);
            return res.status(500).send("[Error] Update Subscription");
        }
    }

    static async Delete(req: Request, res: Response){
        try {
            const id = req.params.id;
            const result = await SuscripcionRepository.Delete(id);
            if (result) {
                return res.status(202).send("Suscripcion Borrada");
            }
            return res.status(404).send("No se encontró la suscripcion");
        } catch (error) {
            console.error("Error al eliminar suscripcion:", error);
            return res.status(500).send("[Error] Delete Subscription");
        }

    }
}