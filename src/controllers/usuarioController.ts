import { mongoose } from "@typegoose/typegoose";
import { UsuarioRepository } from "../repository/usuarioRepository";
import { Request, Response } from 'express';

export class UsuarioController{
    static async GetAll(req: Request, res: Response){
        try {
            const usuarios = await UsuarioRepository.GetAll();
            if (usuarios) {
                return res.status(200).json(usuarios);
            } else {
                return res.status(404).send("No se encontraron usuarios.");
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send("[Error] GetAll Users");
        }
    }
    static async GetOne(req: Request, res: Response){
        const id = req.params.id;
        try {
            const user = await UsuarioRepository.GetOne(id);
            if (user) {
                return res.status(200).json(user);
            }
            return res.status(404).send("No se encontró el usuario.");
        } catch (error) {
            console.error("Error al obtener usuario:", error);
            return res.status(500).send("Error interno del servidor.");
        }
    }
    
    static async Create(req: Request, res: Response){
        // Método para validar los datos de entrada
        const validateUserInput = (req: Request): boolean => {
            let emptySuscripcion = false;
            const { username, password, email, role, suscripcions } = req.body;
            if (!suscripcions || suscripcions.length < 1) {
                return false;   
            }
            for (let i=0; i < suscripcions.length && !emptySuscripcion; i++) {
                const tmp = suscripcions[i];
                emptySuscripcion = !(mongoose.isValidObjectId(tmp.suscripcionId) && tmp.startDate && tmp.endDate)
            }
            return username && password && email && role && !emptySuscripcion ? true : false;
        };
        if (!validateUserInput(req)) {
            return res.status(400).send("Datos de entrada inválidos.");
        }
        const { username, password, email, role, suscripcions } = req.body;
        try {
            const result = await UsuarioRepository.Create(username, password, email, role, suscripcions);
            if (!result) {
                return res.status(406).send("Los datos del usuario no cumplen alguna validacion");
            } else if (typeof result == "string") {
                return res.status(406).send("Una suscripcion dada no existe <" + result + ">");
            }
            return res.status(201).json(result);
        } catch (error) {
            console.error("Error al crear usuario:", error);
            return res.status(500).send("[Error] Create User");
        }
    }
    
    static async Update(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const { username, password, email, role, suscripcions } = req.body;
        // Crear un objeto con solo los campos que se han proporcionado
        const updateFields: any = {};
        if (username) updateFields.username = username;
        if (password) updateFields.password = password;
        if (email) updateFields.email = email;
        if (role) updateFields.role = role;
        if (suscripcions) {
            if (suscripcions.length < 1) {
                return res.status(400).send("Datos de entrada inválidos.");   
            }
            updateFields.suscripcions = suscripcions;
        };

        try {
            const result = await UsuarioRepository.Update(id, updateFields);
            if (!result) {
                return res.status(404).send("No se encontró el usuario para actualizar.");
            } else if (typeof result == "string") {
                if (result == "isNotValid") { return res.status(406).send("Los datos del usuario no cumplen alguna validacion"); }
                else { return res.status(406).send("Una suscripcion dada no existe <" + result + ">"); }
            }
            return res.status(200).json(result);
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            return res.status(500).send("[Error] Update User");
        }
    }

    static async Delete(req: Request, res: Response){
        try {
            const id = req.params.id;
            const result = await UsuarioRepository.Delete(id);
            if (result) {
                return res.status(202).send("Usuario Borrado");
            }
            return res.status(404).send("No se encontró el usuario");
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            return res.status(500).send("[Error] Delete User");
        }

    }
}