import { HostRepository } from "../repository/hostRepository";
import { Request, Response } from "express";

export class HostController{
    static async GetAll(req: Request, res: Response){
        try {
            const hosts = await HostRepository.GetAll();
            if (hosts) {
                return res.status(200).json(hosts);
            } else {
                return res.status(404).send("No se encontraron hosts.");
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send("[Error] GetAll Hosts");
        }
    }

    static async GetOne(req: Request, res: Response){
        const id = req.params.id;
        try {
            const result = await HostRepository.GetOne(id);
            if (result) {
                return res.status(200).json(result);
            }
            return res.status(404).send("No se encontró el host.");
        } catch (error) {
            console.error("Error al obtener host", error)
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
            const result = await HostRepository.Create(name);
            return res.status(201).json(result);
        } catch (error) {
            console.error("Error al crear host:", error);
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
            const result = await HostRepository.Update(id, updateFields);
            if (result) {
                return res.status(200).json(result);
            }
            return res.status(404).send("No se encontró el host para actualizar.");
        } catch (error) {
            console.error("Error al actualizar host:", error);
            return res.status(500).send("[Error] Update Host");
        }
    }

    static async Delete(req: Request, res: Response){
        try {
            const id = req.params.id;
            const result = await HostRepository.Delete(id);
            if (result) {
                return res.status(202).send("Host Borrado");
            }
            return res.status(404).send("No se encontró el host");
        } catch (error) {
            console.error("Error al eliminar host:", error);
            return res.status(500).send("[Error] Delete Host");
        }

    }
}