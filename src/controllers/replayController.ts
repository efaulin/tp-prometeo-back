import { ReplayRepository } from "../repository/replayRepository";
import { Request, Response } from 'express';
import { mongoose } from "@typegoose/typegoose";
import { Replay } from "../schemas/replaySchema";

export class ReplayController{
    static async GetAll(req: Request, res: Response){
        try {
            const replays = await ReplayRepository.GetAll();
            if (replays) {
                return res.status(200).json(replays);
            } else {
                return res.status(404).send("No se encontraron replayes.");
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send("[Error] GetAll Replay");
        }
    }

    static async GetOne(req: Request, res: Response){
        const id = req.params.id;
        try {
            const replay = await ReplayRepository.GetOne(id);
            if (replay) {
                return res.status(200).json(replay);
            }
            return res.status(404).send("No se encontró la replay.");
        } catch (error) {
            console.error("Error al obtener replay:", error);
            return res.status(500).send("Error interno del servidor.");
        }
    }

    static async GetAllOfOne(req: Request, res: Response){
        const id = req.params.id;
        try {
            const replays = await ReplayRepository.GetAllOfOne(id);
            if (replays) {
                return res.status(200).json(replays);
            } else {
                return res.status(404).send("No se encontraron replayes relacionadas al ID <" + id + ">.");
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send("[Error] GetAllOfOne Replay");
        }
    }
    
    static async Create(req: Request, res: Response){
        const validateRepInput = (req: Request): boolean => {
            const { userRef, chapterRef } = req.body;
            return userRef && chapterRef && mongoose.isValidObjectId(userRef) && mongoose.isValidObjectId(chapterRef) ? true : false;
        };
        if (!validateRepInput(req)) {
            return res.status(400).send("Datos de entrada inválidos.");
        }
        const { userRef, chapterRef } = req.body;
        try {
            const result = await ReplayRepository.Create({ userRef, chapterRef });
            if (result) {
                return res.status(201).json(result);
            }
            return res.status(406).send("No existe user o chapter. < User:" + userRef + " | Chapter:" + chapterRef + ">");
        } catch (error) {
            console.error("Error al crear replay:", error);
            return res.status(500).send("[Error] Create Replay");
        }
    }
    
    static async Update(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const { userRef, chapterRef, watchedTimeInSec, rating, review } = req.body;
        
        if (userRef || chapterRef) {
            return res.status(406).send("No se pueden modificar el ID de user y chapter.");
        }

        // Crear un objeto con solo los campos que se han proporcionado
        const updateFields: any = {};
        if (watchedTimeInSec) updateFields.watchedTimeInSec = watchedTimeInSec;
        if (rating) updateFields.rating = rating;
        if (review) updateFields.review = review;

        try {
            const result = await ReplayRepository.Update(id, updateFields);
            if (!result) {
                return res.status(404).send("No se encontró la colección para actualizar.");
            }
            return res.status(200).json(result);
        } catch (error) {
            console.error("Error al actualizar replay:", error);
            return res.status(500).send("[Error] Update Replay");
        }
    }

    static async Delete(req: Request, res: Response){
        try {
            const id = req.params.id;
            const result = await ReplayRepository.Delete(id);
            if (result) {
                return res.status(202).send("Replay Borrada");
            }
            return res.status(404).send("No se encontró la replay");
        } catch (error) {
            console.error("Error al eliminar la replay:", error);
            return res.status(500).send("[Error] Delete Replay");
        }
    }
}