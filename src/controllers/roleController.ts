import { RoleRepository } from "../repository/roleRepository";
import { Request, Response } from "express";

export class RoleController{
    static async GetAll(req: Request, res: Response){
        try {
            const roles = await RoleRepository.GetAll();
            if (roles) {
                return res.status(200).json(roles);
            } else {
                return res.status(404).send("No se encontraron roles.");
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send("[Error] GetAll Roles");
        }
    }

    static async GetOne(req: Request, res: Response){
        const id = req.params.id;
        try {
            const result = await RoleRepository.GetOne(id);
            if (result) {
                return res.status(200).json(result);
            }
            return res.status(404).send("No se encontró el role.");
        } catch (error) {
            console.error("Error al obtener role", error)
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
            const result = await RoleRepository.Create(name);
            return res.status(201).json(result);
        } catch (error) {
            console.error("Error al crear role:", error);
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
            const result = await RoleRepository.Update(id, updateFields);
            if (result) {
                return res.status(200).json(result);
            }
            return res.status(404).send("No se encontró el role para actualizar.");
        } catch (error) {
            console.error("Error al actualizar role:", error);
            return res.status(500).send("[Error] Update Role");
        }
    }

    static async Delete(req: Request, res: Response){
        try {
            const id = req.params.id;
            const result = await RoleRepository.Delete(id);
            if (result) {
                return res.status(202).send("Role Borrado");
            }
            return res.status(404).send("No se encontró el role");
        } catch (error) {
            console.error("Error al eliminar role:", error);
            return res.status(500).send("[Error] Delete Role");
        }

    }
}