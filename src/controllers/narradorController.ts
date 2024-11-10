import { NarradorRepository } from "../repository/narradorRepository";
import { Request, Response } from "express";

export class NarradorController{
    static async GetAll(req: Request, res: Response){
        try {
            const narradores = await NarradorRepository.GetAll();
            if (narradores) {
                return res.status(200).json(narradores);
            } else {
                return res.status(404).send("No se encontraron narradores.");
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send("[Error] GetAll Narrators");
        }
    }

    static async GetOne(req: Request, res: Response){
        const id = req.params.id;
        try {
            const result = await NarradorRepository.GetOne(id);
            if (result) {
                return res.status(200).json(result);
            }
            return res.status(404).send("No se encontró el narrador.");
        } catch (error) {
            console.error("Error al obtener narrador", error)
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
            const result = await NarradorRepository.Create(name);
            return res.status(201).json(result);
        } catch (error) {
            console.error("Error al crear narrador:", error);
            return res.status(500).send("[Error] Create Narrator");
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
            const result = await NarradorRepository.Update(id, updateFields);
            if (result) {
                return res.status(200).json(result);
            }
            return res.status(404).send("No se encontró el narrador para actualizar.");
        } catch (error) {
            console.error("Error al actualizar narrador:", error);
            return res.status(500).send("[Error] Update Narrator");
        }
    }

    static async Delete(req: Request, res: Response){
        try {
            const id = req.params.id;
            const result = await NarradorRepository.Delete(id);
            if (result) {
                return res.status(202).send("Narrador Borrado");
            }
            return res.status(404).send("No se encontró el narrador");
        } catch (error) {
            console.error("Error al eliminar narrador:", error);
            return res.status(500).send("[Error] Delete Narrator");
        }

    }
}