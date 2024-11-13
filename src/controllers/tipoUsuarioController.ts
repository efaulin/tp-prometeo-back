import { TipoUsuarioRepository } from "../repository/tipoUsuarioRepository";
import { Request, Response } from "express";

export class TipoUsuarioController{
    static async GetAll(req: Request, res: Response){
        try {
            const tipoUsuarios = await TipoUsuarioRepository.GetAll();
            if (tipoUsuarios) {
                return res.status(200).json(tipoUsuarios);
            } else {
                return res.status(404).send("No se encontraron tipoUsuarios.");
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send("[Error] GetAll Roles");
        }
    }

    static async GetOne(req: Request, res: Response){
        const id = req.params.id;
        try {
            const result = await TipoUsuarioRepository.GetOne(id);
            if (result) {
                return res.status(200).json(result);
            }
            return res.status(404).send("No se encontró el tipoUsuario.");
        } catch (error) {
            console.error("Error al obtener tipoUsuario", error)
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
            const result = await TipoUsuarioRepository.Create(name);
            return res.status(201).json(result);
        } catch (error) {
            console.error("Error al crear tipoUsuario:", error);
            return res.status(500).send("[Error] Create Role");
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
            const result = await TipoUsuarioRepository.Update(id, updateFields);
            if (result) {
                return res.status(200).json(result);
            }
            return res.status(404).send("No se encontró el tipoUsuario para actualizar.");
        } catch (error) {
            console.error("Error al actualizar tipoUsuario:", error);
            return res.status(500).send("[Error] Update Role");
        }
    }

    static async Delete(req: Request, res: Response){
        try {
            const id = req.params.id;
            const result = await TipoUsuarioRepository.Delete(id);
            if (result) {
                return res.status(202).send("TipoUsuario Borrado");
            }
            return res.status(404).send("No se encontró el tipoUsuario");
        } catch (error) {
            console.error("Error al eliminar tipoUsuario:", error);
            return res.status(500).send("[Error] Delete Role");
        }

    }
}