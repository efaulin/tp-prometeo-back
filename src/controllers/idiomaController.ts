import { IdiomaRepository } from "../repository/idiomaRepository";
import { Request, Response } from "express";

export class IdiomaController{
    static async GetAll(req: Request, res: Response){
        try {
            const idiomas = await IdiomaRepository.GetAll();
            if (idiomas) {
                return res.status(200).json(idiomas);
            } else {
                return res.status(404).send("No se encontraron idiomas.");
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send("[Error] GetAll Languages");
        }
    }

    static async GetOne(req: Request, res: Response){
        const id = req.params.id;
        try {
            const result = await IdiomaRepository.GetOne(id);
            if (result) {
                return res.status(200).json(result);
            }
            return res.status(404).send("No se encontró el idioma.");
        } catch (error) {
            console.error("Error al obtener idioma", error)
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
            const result = await IdiomaRepository.Create(name);
            return res.status(201).json(result);
        } catch (error) {
            console.error("Error al crear idioma:", error);
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
            const result = await IdiomaRepository.Update(id, updateFields);
            if (result) {
                return res.status(200).json(result);
            }
            return res.status(404).send("No se encontró el idioma para actualizar.");
        } catch (error) {
            console.error("Error al actualizar idioma:", error);
            return res.status(500).send("[Error] Update Language");
        }
    }

    static async Delete(req: Request, res: Response){
        try {
            const id = req.params.id;
            const result = await IdiomaRepository.Delete(id);
            if (result) {
                return res.status(202).send("Idioma Borrado");
            }
            return res.status(404).send("No se encontró el idioma");
        } catch (error) {
            console.error("Error al eliminar idioma:", error);
            return res.status(500).send("[Error] Delete Language");
        }

    }
}