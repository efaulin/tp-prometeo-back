import { ChapterRepository } from "../repository/chapterRepository";
import { Request, Response } from 'express';
import { mongoose } from "@typegoose/typegoose";
import { Chapter } from "../schemas/chapterSchema.js";

export class ChapterController{
    static async GetAll(req: Request, res: Response){
        try {
            const chapters = await ChapterRepository.GetAll();
            if (chapters) {
                return res.status(200).json(chapters);
            } else {
                return res.status(404).send("No se encontraron chapters.");
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send("[Error] GetAll Chapter");
        }
    }
    static async GetOne(req: Request, res: Response){
        const id = req.params.id;
        try {
            const chapter = await ChapterRepository.GetOne(id);
            if (chapter) {
                return res.status(200).json(chapter);
            }
            return res.status(404).send("No se encontró el chapter.");
        } catch (error) {
            console.error("Error al obtener chapter:", error);
            return res.status(500).send("Error interno del servidor.");
        }
    }
    
    static async Create(req: Request, res: Response){
        const validateInput = (req: Request): boolean => {
            const tmpCap : Partial<Chapter> = { ...req.body };
            let isPodcast;
            let isAudiobook;
            
            //Valido la division total.
            let emptyHost = false;
            let emptyAuthor = false;
            if (tmpCap.authorsRef) {
                for (let i=0; i < tmpCap.authorsRef.length && !emptyAuthor; i++) {
                    emptyAuthor = !mongoose.isValidObjectId(tmpCap.authorsRef[i]);
                }
            }
            if (tmpCap.hostsRef) {
                for (let i=0; i < tmpCap.hostsRef.length && !emptyHost; i++) {
                    emptyHost = !mongoose.isValidObjectId(tmpCap.hostsRef[i]);
                }
                if (!emptyHost) isPodcast = true;
            }
            if (tmpCap.narratorRef && !emptyAuthor && mongoose.isValidObjectId(tmpCap.narratorRef)) isAudiobook = true;

            //¡Un Chapter no puede ser Audiolibro y Podcast!. Pero tampoco no ser ninguno.
            if ((isAudiobook && isPodcast) || !(isAudiobook || isPodcast)) {
                return false;
            }

            //¿Nulos? Ninguno.
            const result = tmpCap.collectionRef && mongoose.isValidObjectId(tmpCap.collectionRef.toString()) && tmpCap.name && !isNaN(tmpCap.durationInSeconds!) && tmpCap.languageRef && mongoose.isValidObjectId(tmpCap.languageRef.toString()) && tmpCap.description && tmpCap.uploadDate && tmpCap.publicationDate ? true : false;
            return result;
        };
        if (!validateInput(req)) {
            return res.status(400).send("Datos de entrada inválidos.");
        }
        const tmpCap : Partial<Chapter> = { ...req.body };
        try {
            const result = await ChapterRepository.Create({ ...tmpCap });
            if (result) {
                return res.status(201).json(result);
            }
            return res.status(406).send("No existe collection <" + tmpCap.collectionRef + ">");
        } catch (error) {
            console.error("Error al crear colección:", error);
            return res.status(500).send("[Error] Create Chapter");
        }
    }
    
    static async Update(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const tmpCap : Partial<Chapter> = { ...req.body };
        
        // Crear un objeto con solo los campos que se han proporcionado
        const updateFields: any = {};
        if (tmpCap.collectionRef) {
            if (mongoose.isValidObjectId(tmpCap.collectionRef)) {
                updateFields.collectionRef = tmpCap.collectionRef;
            }
        }
        if (tmpCap.hostsRef && (tmpCap.authorsRef || tmpCap.narratorRef)) {
            return res.status(400).send("Datos de entrada inválidos.");
        } else {
            if (tmpCap.hostsRef) {
                let emptyHost = false;
                for (let i=0; i < tmpCap.hostsRef.length && !emptyHost; i++) {
                    emptyHost = !mongoose.isValidObjectId(tmpCap.hostsRef[i]);
                }
                if (!emptyHost) updateFields.hostsRef = tmpCap.hostsRef;
            }
            if (tmpCap.authorsRef) {
                let emptyAuthor = false;
                for (let i=0; i < tmpCap.authorsRef.length && !emptyAuthor; i++) {
                    emptyAuthor = !mongoose.isValidObjectId(tmpCap.authorsRef[i]);
                }
                if (!emptyAuthor) updateFields.authorsRef = tmpCap.authorsRef;
            }
            if (tmpCap.narratorRef) {
                if (mongoose.isValidObjectId(tmpCap.narratorRef)) updateFields.narratorRef = tmpCap.narratorRef;
            }
        }
        if (tmpCap.name) updateFields.name = tmpCap.name;
        if (tmpCap.durationInSeconds) updateFields.durationInSeconds = tmpCap.durationInSeconds;
        if (tmpCap.languageRef) {
            if (mongoose.isValidObjectId(tmpCap.languageRef)) updateFields.languageRef = tmpCap.languageRef;
        }
        if (tmpCap.description) updateFields.description = tmpCap.description;
        if (tmpCap.uploadDate) updateFields.uploadDate = tmpCap.uploadDate;
        if (tmpCap.publicationDate) updateFields.publicationDate = tmpCap.publicationDate;

        try {
            const result = await ChapterRepository.Update(id, updateFields);
            if (!result) {
                return res.status(404).send("No se encontró el objeto de alguna relacion.");
            } else if (typeof result == "string") {
                return res.status(406).send("Una chapter dada no existe <" + result + ">");
            }
            return res.status(200).json(result);
        } catch (error) {
            console.error("Error al actualizar capitulo:", error);
            return res.status(500).send("[Error] Update Chapter");
        }
    }

    static async Delete(req: Request, res: Response){
        try {
            const id = req.params.id;
            const result = await ChapterRepository.Delete(id);
            if (result) {
                return res.status(202).send("Chapter Borrado");
            }
            return res.status(404).send("No se encontró el chapter");
        } catch (error) {
            console.error("Error al eliminar el chapter:", error);
            return res.status(500).send("[Error] Delete Chapter");
        }
    }
}