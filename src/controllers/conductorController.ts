import { ConductorRepository } from "../repository/conductorRepository";
import { Request, Response } from "express";

export class ConductorController{
    static async GetAll(req: Request, res: Response){
        try {
            const conductores = await ConductorRepository.GetAll();
            if (conductores) {
                return res.status(200).json(conductores);
            } else {
                return res.status(404).send("No se encontraron conductores.");
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send("[Error] GetAll Hosts");
        }
    }

    static async GetOne(req: Request, res: Response){
        const id = req.params.id;
        try {
            const result = await ConductorRepository.GetOne(id);
            if (result) {
                return res.status(200).json(result);
            }
            return res.status(404).send("No se encontró el conductor.");
        } catch (error) {
            console.error("Error al obtener conductor", error)
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
            const result = await ConductorRepository.Create(name);
            return res.status(201).json(result);
        } catch (error) {
            console.error("Error al crear conductor:", error);
            return res.status(500).send("[Error] Create Host");
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
            const result = await ConductorRepository.Update(id, updateFields);
            if (result) {
                return res.status(200).json(result);
            }
            return res.status(404).send("No se encontró el conductor para actualizar.");
        } catch (error) {
            console.error("Error al actualizar conductor:", error);
            return res.status(500).send("[Error] Update Host");
        }
    }

    static async Delete(req: Request, res: Response){
        try {
            const id = req.params.id;
            const result = await ConductorRepository.Delete(id);
            if (result) {
                return res.status(202).send("Conductor Borrado");
            }
            return res.status(404).send("No se encontró el conductor");
        } catch (error) {
            console.error("Error al eliminar conductor:", error);
            return res.status(500).send("[Error] Delete Host");
        }

    }
}