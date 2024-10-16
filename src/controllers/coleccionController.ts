import { ColeccionRepository } from "../repository/coleccionRepository";
import { Request, Response } from 'express';
import { Coleccion } from "../schemas/coleccionSchema";
import { mongoose } from "@typegoose/typegoose";

export class ColeccionControler{
    static async GetAll(req: Request, res: Response){
        try {
            const colecciones = await ColeccionRepository.GetAll();
            if (colecciones) {
                return res.status(200).json(colecciones);
            } else {
                return res.status(404).send("No se encontraron colecciones.");
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send("[Error] GetAll Collection");
        }
    }
    static async GetOne(req: Request, res: Response){
        const id = req.params.id;
        try {
            const Collection = await ColeccionRepository.GetOne(id);
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
            const { name, categories } = req.body;
            let control = true;
            if (categories.length >= 1) {
                for (let i = 0; i < categories.length && control ; i++) {
                    control = mongoose.isValidObjectId(categories[i]);
                }
            }
            return name && categories && control ? true : false;
        };
        if (!validateColInput(req)) {
            return res.status(400).send("Datos de entrada inválidos.");
        }
        const { name, categories } = req.body;
        try {
            const result = await ColeccionRepository.Create(name, categories);
            if (typeof result == "string") {
                return res.status(406).send("Una coleccion dada no existe <" + result + ">");
            }
            return res.status(201).json(result);
        } catch (error) {
            console.error("Error al crear colección:", error);
            return res.status(500).send("[Error] Create Collection");
        }
    }

    static async Update(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const { name, categories } = req.body;
        
        // Crear un objeto con solo los campos que se han proporcionado
        const updateFields: any = {};
        if (name) updateFields.name = name;
        if (categories) updateFields.categories = categories;

        try {
            const result = await ColeccionRepository.Update(id, updateFields);
            if (!result) {
                return res.status(404).send("No se encontró la colección para actualizar.");
            } else if (typeof result == "string") {
                return res.status(406).send("Una coleccion dada no existe <" + result + ">");
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
            const result = await ColeccionRepository.Delete(id);
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