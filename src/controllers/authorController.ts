import { AuthorRepository } from "../repository/authorRepository";
import { Request, Response } from "express";

export class AuthorController{
    static async GetAll(req: Request, res: Response){
        try {
            const authors = await AuthorRepository.GetAll();
            if (authors) {
                return res.status(200).json(authors);
            } else {
                return res.status(404).send("No se encontraron authors.");
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send("[Error] GetAll Authors");
        }
    }

    static async GetOne(req: Request, res: Response){
        const id = req.params.id;
        try {
            const result = await AuthorRepository.GetOne(id);
            if (result) {
                return res.status(200).json(result);
            }
            return res.status(404).send("No se encontró el author.");
        } catch (error) {
            console.error("Error al obtener author", error)
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
            const result = await AuthorRepository.Create(name);
            return res.status(201).json(result);
        } catch (error) {
            console.error("Error al crear author:", error);
            return res.status(500).send("[Error] Create Author");
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
            const result = await AuthorRepository.Update(id, updateFields);
            if (result) {
                return res.status(200).json(result);
            }
            return res.status(404).send("No se encontró el author para actualizar.");
        } catch (error) {
            console.error("Error al actualizar author:", error);
            return res.status(500).send("[Error] Update Author");
        }
    }

    static async Delete(req: Request, res: Response){
        try {
            const id = req.params.id;
            const result = await AuthorRepository.Delete(id);
            if (result) {
                return res.status(202).send("Author Borrado");
            }
            return res.status(404).send("No se encontró el author");
        } catch (error) {
            console.error("Error al eliminar author:", error);
            return res.status(500).send("[Error] Delete Author");
        }

    }
}