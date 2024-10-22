import { ReproduccionRepository } from "../repository/reproduccionRepository";
import { Request, Response } from 'express';
import { mongoose } from "@typegoose/typegoose";
import { Reproduccion } from "../schemas/reproduccionSchema";

export class ReproduccionControler{
    static async GetAll(req: Request, res: Response){
        try {
            const replays = await ReproduccionRepository.GetAll();
            if (replays) {
                return res.status(200).json(replays);
            } else {
                return res.status(404).send("No se encontraron reproducciones.");
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send("[Error] GetAll Replay");
        }
    }

    static async GetOne(req: Request, res: Response){
        const id = req.params.id;
        try {
            const replay = await ReproduccionRepository.GetOne(id);
            if (replay) {
                return res.status(200).json(replay);
            }
            return res.status(404).send("No se encontró la reproduccion.");
        } catch (error) {
            console.error("Error al obtener reproduccion:", error);
            return res.status(500).send("Error interno del servidor.");
        }
    }

    static async GetAllOfOne(req: Request, res: Response){
        const id = req.params.id;
        //TODO Hacer un metodo GetAllOfOne en repository que busque si el id es de usuario o capitulo.
        try {
            const replays = await ReproduccionRepository.GetAllOfOne(id);
            if (replays) {
                return res.status(200).json(replays);
            } else {
                return res.status(404).send("No se encontraron reproducciones relacionadas al ID <" + id + ">.");
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send("[Error] GetAllOfOne Replay");
        }
    }
    
    static async Create(req: Request, res: Response){
        const validateRepInput = (req: Request): boolean => {
            const { usuarioId, capituloId } = req.body;
            return usuarioId && capituloId && mongoose.isValidObjectId(usuarioId) && mongoose.isValidObjectId(capituloId) ? true : false;
        };
        if (!validateRepInput(req)) {
            return res.status(400).send("Datos de entrada inválidos.");
        }
        const { usuarioId, capituloId } = req.body;
        try {
            const result = await ReproduccionRepository.Create({ usuarioId, capituloId });
            if (result) {
                return res.status(201).json(result);
            }
            return res.status(406).send("No existe usuario o capitulo. < Usuario:" + usuarioId + " | Capitulo:" + capituloId + ">");
        } catch (error) {
            console.error("Error al crear reproduccion:", error);
            return res.status(500).send("[Error] Create Replay");
        }
    }
    
    static async Update(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const { usuarioId, capituloId, watchedTimeInSec, rating, review } = req.body;
        
        if (usuarioId || capituloId) {
            return res.status(406).send("No se pueden modificar el ID de usuario y capitulo.");
        }

        // Crear un objeto con solo los campos que se han proporcionado
        const updateFields: any = {};
        if (watchedTimeInSec) updateFields.watchedTimeInSec = watchedTimeInSec;
        if (rating) updateFields.rating = rating;
        if (review) updateFields.review = review;

        try {
            const result = await ReproduccionRepository.Update(id, updateFields);
            if (!result) {
                return res.status(404).send("No se encontró la colección para actualizar.");
            }
            return res.status(200).json(result);
        } catch (error) {
            console.error("Error al actualizar reproduccion:", error);
            return res.status(500).send("[Error] Update Replay");
        }
    }

    static async Delete(req: Request, res: Response){
        try {
            const id = req.params.id;
            const result = await ReproduccionRepository.Delete(id);
            if (result) {
                return res.status(202).send("Reproduccion Borrada");
            }
            return res.status(404).send("No se encontró la reproduccion");
        } catch (error) {
            console.error("Error al eliminar la reproduccion:", error);
            return res.status(500).send("[Error] Delete Replay");
        }
    }
}