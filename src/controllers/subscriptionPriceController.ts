import { SubscriptionRepository } from "../repository/subscriptionRepository";
import { Request, Response } from "express";
import { SubscriptionPriceRepository } from "../repository/subscriptionPriceRepository";
import { MongoError, MongoServerError } from "mongodb";

export class SubscriptionPriceController{
    static async GetAll(req: Request, res: Response){
        try {
            const precios = await SubscriptionPriceRepository.GetAll();
            if (precios) {
                return res.status(200).json(precios);
            }
            return res.status(404).send("No se encontró la subscription.");
        } catch (error) {
            console.error("Error al obtener subscription", error)
            return res.status(500).send("Error interno del servidor.");
        }
    }

    static async GetAllOfOne(req: Request, res: Response){
        const subscriptionId = req.params.id;
        try {
            const subscription = await SubscriptionRepository.GetOne(subscriptionId);
            if (subscription) {
                const prices = await SubscriptionPriceRepository.GetAllOfOne(subscriptionId);
                return res.status(200).json(prices);
            }
            return res.status(404).send("No se encontró la subscription.");
        } catch (error) {
            console.error("Error al obtener subscription", error)
            return res.status(500).send("Error interno del servidor.");
        }
    }

    static async GetOne(req: Request, res: Response){
        const id = req.params.id;
        try {
            const existPrice = await SubscriptionPriceRepository.GetOne(id);
            if (existPrice) {
                return res.status(200).json(existPrice);
            }
            return res.status(404).send("No se encontro el precio en la base de datos");
        } catch (error) {
            console.error("Error al obtener subscription", error)
            return res.status(500).send("Error interno del servidor.");
        }
    }
    
    static async Create(req: Request, res: Response){
        const urlSubscriptionId = req.params.id;
        const validateUserInput = (req: Request):boolean => {
            const { startDate, amount, subscriptionRef } = req.body;
            return startDate && amount && subscriptionRef && subscriptionRef == urlSubscriptionId ? true : false;
        }
        if (!validateUserInput(req)) {
            return res.status(400).send("Datos de entrada invalidos");
        }
        const { startDate, amount, subscriptionRef } = req.body;
        try {
            let subscription = await SubscriptionRepository.GetOne(subscriptionRef);
            if (subscription) {
                const result = await SubscriptionPriceRepository.Create(startDate, amount, subscription);
                if (result) {
                    return res.status(201).json(result);
                }
            }
            return res.status(404).send("No se encontró la subscription.");
        } catch (error) {
            console.error("Error al obtener subscription: ", error);
            if (error instanceof MongoError && error.code == 11000) {
                return res.status(406).send("Dos Precios tienen la misma fecha.");
            }
            return res.status(500).send("Error interno del servidor.");
        }
    }

    static async Delete(req: Request, res: Response){
        try {
            const { id } = req.params;
            const onePrice = await SubscriptionPriceRepository.GetOne(id);
            if (onePrice) {
                const result = await SubscriptionPriceRepository.Delete(id);
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