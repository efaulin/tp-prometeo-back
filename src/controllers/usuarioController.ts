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
    }

    static async GetOne(id:string){
        const usuario = await UsuarioRepository.GetOne(id);
        return usuario;
    }

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