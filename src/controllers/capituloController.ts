import { CapituloRepository } from "../repository/capituloRepository";
import { Request, Response } from 'express';
import { mongoose } from "@typegoose/typegoose";
import { Capitulo } from "../schemas/capituloSchema.js";

export class CapituloController{
    static async GetAll(req: Request, res: Response){
        try {
            const chapters = await CapituloRepository.GetAll();
            if (chapters) {
                return res.status(200).json(chapters);
            } else {
                return res.status(404).send("No se encontraron capitulos.");
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send("[Error] GetAll Chapter");
        }
    }
    static async GetOne(req: Request, res: Response){
        const id = req.params.id;
        try {
            const chapter = await CapituloRepository.GetOne(id);
            if (chapter) {
                return res.status(200).json(chapter);
            }
            return res.status(404).send("No se encontró el capitulo.");
        } catch (error) {
            console.error("Error al obtener capitulo:", error);
            return res.status(500).send("Error interno del servidor.");
        }
    }
    
    static async Create(req: Request, res: Response){
        const validateInput = (req: Request): boolean => {
            const tmpCap : Partial<Capitulo> = { ...req.body };
            let isPodcast;
            let isAudiobook;
            
            //Valido la division total.
            if (tmpCap.narrator && tmpCap.author && mongoose.isValidObjectId(tmpCap.narrator) && mongoose.isValidObjectId(tmpCap.author)) isAudiobook = true;
            if (tmpCap.host && mongoose.isValidObjectId(tmpCap.host)) isPodcast = true;

            //¡Un Capitulo no puede ser Audiolibro y Podcast!. Pero tampoco no ser ninguno.
            if ((isAudiobook && isPodcast) || !(isAudiobook || isPodcast)) {
                return false;
            }

            //¿Nulos? Ninguno.
            return tmpCap.coleccionId && mongoose.isValidObjectId(tmpCap.coleccionId) && tmpCap.name && tmpCap.durationInSeconds && tmpCap.language && mongoose.isValidObjectId(tmpCap.language) && tmpCap.description && tmpCap.uploadDate && tmpCap.publicationDate ? true : false;
        };
        if (!validateInput(req)) {
            return res.status(400).send("Datos de entrada inválidos.");
        }
        const tmpCap : Partial<Capitulo> = { ...req.body };
        try {
            const result = await CapituloRepository.Create({ ...tmpCap });
            if (result) {
                return res.status(201).json(result);
            }
            return res.status(406).send("No existe coleccion <" + tmpCap.coleccionId + ">");
        } catch (error) {
            console.error("Error al crear colección:", error);
            return res.status(500).send("[Error] Create Chapter");
        }
    }
    
    static async Update(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const {
            coleccionId,
            name,
            author, 
            host,
            durationInSeconds,
            language,
            description,
            narrator,
            uploadDate,
            publicationDate
        } = req.body;
        
        // Crear un objeto con solo los campos que se han proporcionado
        const updateFields: any = {};
        if (coleccionId) {
            if (mongoose.isValidObjectId(coleccionId)) {
                updateFields.coleccionId = coleccionId;
            }
        }
        if (host) {
            if (mongoose.isValidObjectId(host)) updateFields.host = host;
        } else {
            if (author) {
                if (mongoose.isValidObjectId(author)) updateFields.author = author;
            }
            if (narrator) {
                if (mongoose.isValidObjectId(narrator)) updateFields.narrator = narrator;
            }
        }
        if (name) updateFields.name = name;
        if (durationInSeconds) updateFields.durationInSeconds = durationInSeconds;
        if (language) updateFields.language = language;
        if (description) updateFields.description = description;
        if (uploadDate) updateFields.uploadDate = uploadDate;
        if (publicationDate) updateFields.publicationDate = publicationDate;

        try {
            const result = await CapituloRepository.Update(id, updateFields);
            if (!result) {
                return res.status(404).send("No se encontró la colección para actualizar.");
            } else if (typeof result == "string") {
                return res.status(406).send("Una capitulo dada no existe <" + result + ">");
            }
            return res.status(200).json(result);
        } catch (error) {
            console.error("Error al actualizar colección:", error);
            return res.status(500).send("[Error] Update Chapter");
        }
    }

    static async Delete(req: Request, res: Response){
        try {
            const id = req.params.id;
            const result = await CapituloRepository.Delete(id);
            if (result) {
                return res.status(202).send("Capitulo Borrado");
            }
            return res.status(404).send("No se encontró el capitulo");
        } catch (error) {
            console.error("Error al eliminar el capitulo:", error);
            return res.status(500).send("[Error] Delete Chapter");
        }
    }
}