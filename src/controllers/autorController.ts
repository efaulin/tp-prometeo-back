import { AutorRepository } from "../repository/autorRepository";
import { Request, Response } from "express";

export class AutorController{
    static async GetAll(req: Request, res: Response){
        try {
            const autores = await AutorRepository.GetAll();
            if (autores) {
                return res.status(200).json(autores);
            } else {
                return res.status(404).send("No se encontraron autores.");
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send("[Error] GetAll Authors");
        }
    }

    static async GetOne(req: Request, res: Response){
        const id = req.params.id;
        try {
            const result = await AutorRepository.GetOne(id);
            if (result) {
                return res.status(200).json(result);
            }
            return res.status(404).send("No se encontró el autor.");
        } catch (error) {
            console.error("Error al obtener autor", error)
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
            const result = await AutorRepository.Create(name);
            return res.status(201).json(result);
        } catch (error) {
            console.error("Error al crear autor:", error);
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
            const result = await AutorRepository.Update(id, updateFields);
            if (result) {
                return res.status(200).json(result);
            }
            return res.status(404).send("No se encontró el autor para actualizar.");
        } catch (error) {
            console.error("Error al actualizar autor:", error);
            return res.status(500).send("[Error] Update Author");
        }
    }

    static async Delete(req: Request, res: Response){
        try {
            const id = req.params.id;
            const result = await AutorRepository.Delete(id);
            if (result) {
                return res.status(202).send("Autor Borrado");
            }
            return res.status(404).send("No se encontró el autor");
        } catch (error) {
            console.error("Error al eliminar autor:", error);
            return res.status(500).send("[Error] Delete Author");
        }

    }
}