<<<<<<< HEAD
import { UsuarioRepository } from "../repository/usuarioRepository.js";
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
            const { usuario, contra, email, tipo } = req.body;
            return usuario && contra && email && tipo ? true : false;
        };
        if (!validateUserInput(req)) {
            return res.status(400).send("Datos de entrada inválidos.");
        }
        const { usuario, contra, email, tipo } = req.body;
        try {
            const result = await UsuarioRepository.Create(usuario, contra, email, tipo);
            return res.status(201).json(result);
        } catch (error) {
            console.error("Error al crear usuario:", error);
            return res.status(500).send("[Error] Create User");
        }
=======
import { Usuario } from "../entities/usuarioEntity.js";
import { UsuarioRepository } from "../repository/usuarioRepository.js";
import { ObjectId } from "mongodb";
import { Controller } from "./abstractController.js";
import { Request } from "express";

//TODO Manejo de errores GetOne GetAll y Create
export class UsuarioController extends Controller<Usuario>() {
    static New(usuario:string ,contra:string ,email:string ,tipo:string ,id:string|undefined=undefined):Usuario {
        return new Usuario(usuario,contra,email,tipo,new ObjectId(id)||undefined);
    }
    
    static async GetAll(){
        const usuarios = await UsuarioRepository.GetAll();
        return usuarios;
>>>>>>> 312a9b89def48b4c6d9bb29c0f4b591d38781a20
    }

    static async Update(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const { usuario, contra, email, tipo } = req.body;
        // Crear un objeto con solo los campos que se han proporcionado
        const updateFields: any = {};
        if (usuario) updateFields.username = usuario;
        if (contra) updateFields.password = contra;
        if (email) updateFields.email = email;
        if (tipo) updateFields.role = tipo;

        try {
            const result = await UsuarioRepository.Update(id, updateFields);
            if (result) {
                return res.status(200).json(result);
            }
            return res.status(404).send("No se encontró el usuario para actualizar.");
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            return res.status(500).send("[Error] Update User");
        }
    }

<<<<<<< HEAD
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
=======
    static async Create(usr:Usuario){
        const idUsuario = await UsuarioRepository.Create(usr);
        return usr;
    }

    static async Update(usr:Usuario){
        const result = await UsuarioRepository.Update(usr)
        return result;
    }

    static async Delete(id:string){
        const result = await UsuarioRepository.Delete(id);
        return result;
>>>>>>> 312a9b89def48b4c6d9bb29c0f4b591d38781a20
    }

    //TODO Ver "Sanitizacion de input", mientras queda temporalmente
    /**
     * Funcion para verificar las entradas para un objeto Usuario
     * @param req Objeto **Request**
     * @returns Si pasa la verificacion devuelve **TRUE**, en caso de algun error **FALSE**.
     */
    static Inputs(req:Request){
        const {usuario, contra, email, tipo} = req.body;

        if (!usuario || !contra || !email || !tipo) {
            return false;
        } else {
            return true;
        }
    }
}