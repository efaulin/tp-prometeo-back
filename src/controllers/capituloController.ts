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
            let emptyHost = false;
            let emptyAuthor = false;
            if (tmpCap.authors) {
                for (let i=0; i < tmpCap.authors.length && !emptyAuthor; i++) {
                    emptyAuthor = !mongoose.isValidObjectId(tmpCap.authors[i]);
                }
            }
            if (tmpCap.hosts) {
                for (let i=0; i < tmpCap.hosts.length && !emptyHost; i++) {
                    emptyHost = !mongoose.isValidObjectId(tmpCap.hosts[i]);
                }
                if (!emptyHost) isPodcast = true;
            }
            if (tmpCap.narrator && !emptyAuthor && mongoose.isValidObjectId(tmpCap.narrator)) isAudiobook = true;

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
        const tmpCap : Partial<Capitulo> = { ...req.body };
        
        // Crear un objeto con solo los campos que se han proporcionado
        const updateFields: any = {};
        if (tmpCap.coleccionId) {
            if (mongoose.isValidObjectId(tmpCap.coleccionId)) {
                updateFields.coleccionId = tmpCap.coleccionId;
            }
        }
        if (tmpCap.hosts) {
            let emptyHost = false;
            for (let i=0; i < tmpCap.hosts.length && !emptyHost; i++) {
                emptyHost = !mongoose.isValidObjectId(tmpCap.hosts[i]);
            }
            if (!emptyHost) updateFields.hosts = tmpCap.hosts;
        } else {
            if (tmpCap.authors) {
                let emptyAuthor = false;
                for (let i=0; i < tmpCap.authors.length && !emptyAuthor; i++) {
                    emptyAuthor = !mongoose.isValidObjectId(tmpCap.authors[i]);
                }
                if (!emptyAuthor) updateFields.authors = tmpCap.authors;
            }
            if (tmpCap.narrator) {
                if (mongoose.isValidObjectId(tmpCap.narrator)) updateFields.narrator = tmpCap.narrator;
            }
        }
        if (tmpCap.name) updateFields.name = tmpCap.name;
        if (tmpCap.durationInSeconds) updateFields.durationInSeconds = tmpCap.durationInSeconds;
        if (tmpCap.language) {
            if (mongoose.isValidObjectId(tmpCap.language)) updateFields.language = tmpCap.language;
        }
        if (tmpCap.description) updateFields.description = tmpCap.description;
        if (tmpCap.uploadDate) updateFields.uploadDate = tmpCap.uploadDate;
        if (tmpCap.publicationDate) updateFields.publicationDate = tmpCap.publicationDate;

        try {
            const result = await CapituloRepository.Update(id, updateFields);
            if (!result) {
                return res.status(404).send("No se encontró el objeto de alguna relacion.");
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