import { CapituloRepository } from "../repository/capituloRepository";
import { Request, Response } from 'express';
import { mongoose } from "@typegoose/typegoose";
//TODO Implementar los cambios DBv2
export class CapituloControler{
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
        const validateColInput = (req: Request): boolean => {
            const { coleccionId, name, author, host, producer, durationInSeconds, language, description, narrator, publisher, uploadDate, publicationDate } = req.body;
            return coleccionId && mongoose.isValidObjectId(coleccionId) && name && author && host && producer && durationInSeconds && language && description && narrator && publisher && uploadDate && publicationDate ? true : false;
        };
        if (!validateColInput(req)) {
            return res.status(400).send("Datos de entrada inválidos.");
        }
        const { coleccionId, name, author, host, durationInSeconds, language, description, narrator, uploadDate, publicationDate } = req.body;
        try {
            const result = await CapituloRepository.Create({
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
            });
            if (result) {
                return res.status(201).json(result);
            }
            return res.status(406).send("No existe coleccion <" + coleccionId + ">");
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
            producer,
            durationInSeconds,
            language,
            description,
            narrator,
            publisher,
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
        if (name) updateFields.name = name;
        if (author) updateFields.author = author;
        if (host) updateFields.host = host;
        if (producer) updateFields.producer = producer;
        if (durationInSeconds) updateFields.durationInSeconds = durationInSeconds;
        if (language) updateFields.language = language;
        if (description) updateFields.description = description;
        if (narrator) updateFields.narrator = narrator;
        if (publisher) updateFields.publisher = publisher;
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