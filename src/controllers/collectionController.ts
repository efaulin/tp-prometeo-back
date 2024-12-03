import { CollectionRepository } from "../repository/collectionRepository";
import { Request, Response } from 'express';
import { Collection } from "../schemas/collectionSchema";
import { mongoose } from "@typegoose/typegoose";

export class CollectionController{
    static async GetAll(req: Request, res: Response){
        try {
            const collections = await CollectionRepository.GetAll();
            if (collections) {
                return res.status(200).json(collections);
            } else {
                return res.status(404).send("No se encontraron collections.");
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send("[Error] GetAll Collection");
        }
    }
    static async GetOne(req: Request, res: Response){
        const id = req.params.id;
        try {
            const Collection = await CollectionRepository.GetOne(id);
            if (Collection) {
                return res.status(200).json(Collection);
            }
            return res.status(404).send("No se encontró la colección.");
        } catch (error) {
            console.error("Error al obtener colección:", error);
            return res.status(500).send("Error interno del servidor.");
        }
    }

    static async Create(req: Request, res: Response){
        // Método para validar los datos de entrada
        const validateColInput = (req: Request): boolean => {
            const { name, description, categories } = req.body;
            let control = true;
            if (categories.length >= 1) {
                for (let i = 0; i < categories.length && control ; i++) {
                    control = mongoose.isValidObjectId(categories[i]);
                }
            }
            return name && description && categories && control ? true : false;
        };
        if (!validateColInput(req)) {
            return res.status(400).send("Datos de entrada inválidos.");
        }
        const { name, description, categories } = req.body;
        try {
            const result = await CollectionRepository.Create(name, description, categories);
            if (typeof result == "string") {
                return res.status(406).send("Una collection dada no existe <" + result + ">");
            }
            return res.status(201).json(result);
        } catch (error) {
            console.error("Error al crear colección:", error);
            return res.status(500).send("[Error] Create Collection");
        }
    }

    static async Update(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const { name, description, categories } = req.body;
        
        // Crear un objeto con solo los campos que se han proporcionado
        const updateFields: any = {};
        if (name) updateFields.name = name;
        if (description) updateFields.description = description;
        if (categories) updateFields.categories = categories;

        try {
            const result = await CollectionRepository.Update(id, updateFields);
            if (!result) {
                return res.status(404).send("No se encontró la colección para actualizar.");
            } else if (typeof result == "string") {
                return res.status(406).send("Una collection dada no existe <" + result + ">");
            }
            return res.status(200).json(result);
        } catch (error) {
            console.error("Error al actualizar colección:", error);
            return res.status(500).send("[Error] Update Collection");
        }
    }

    static async Delete(req: Request, res: Response){
        try {
            const id = req.params.id;
            const result = await CollectionRepository.Delete(id);
            if (result) {
                return res.status(202).send("Colección Borrada");
            }
            return res.status(404).send("No se encontró la colección");
        } catch (error) {
            console.error("Error al eliminar la colección:", error);
            return res.status(500).send("[Error] Delete Collection");
        }
    }
}