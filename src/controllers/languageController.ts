import { LanguageRepository } from "../repository/languageRepository";
import { Request, Response } from "express";

export class LanguageController{
    static async GetAll(req: Request, res: Response){
        try {
            const languages = await LanguageRepository.GetAll();
            if (languages) {
                return res.status(200).json(languages);
            } else {
                return res.status(404).send("No se encontraron languages.");
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send("[Error] GetAll Languages");
        }
    }

    static async GetOne(req: Request, res: Response){
        const id = req.params.id;
        try {
            const result = await LanguageRepository.GetOne(id);
            if (result) {
                return res.status(200).json(result);
            }
            return res.status(404).send("No se encontró el language.");
        } catch (error) {
            console.error("Error al obtener language", error)
            return res.status(500).send("Error interno del servidor.");
        }
    }
    
    static async Create(req: Request, res: Response){
        const validateUserInput = (req: Request):boolean => {
            const { name } = req.body;
            return name ? true : false;
        }
        if (!validateUserInput(req)) {
            return res.status(400).send("Datos de entrada invalidos");
        }
        
        const { name } = req.body;
        try {
            const result = await LanguageRepository.Create(name);
            return res.status(201).json(result);
        } catch (error) {
            console.error("Error al crear language:", error);
            return res.status(500).send("[Error] Create Language");
        }
    }

    static async Update(req: Request, res: Response) {
        const id = req.params.id;
        const { name } = req.body;
        // Crear un objeto con solo los campos que se han proporcionado
        const updateFields: any = {};
        if (name) updateFields.name = name;
        //Se deja de esta manera en caso de agregar mas atributos en el futuro

        try {
            const result = await LanguageRepository.Update(id, updateFields);
            if (result) {
                return res.status(200).json(result);
            }
            return res.status(404).send("No se encontró el language para actualizar.");
        } catch (error) {
            console.error("Error al actualizar language:", error);
            return res.status(500).send("[Error] Update Language");
        }
    }

    static async Delete(req: Request, res: Response){
        try {
            const id = req.params.id;
            const result = await LanguageRepository.Delete(id);
            if (result) {
                return res.status(202).send("Language Borrado");
            }
            return res.status(404).send("No se encontró el language");
        } catch (error) {
            console.error("Error al eliminar language:", error);
            return res.status(500).send("[Error] Delete Language");
        }

    }
}