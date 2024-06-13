import { Console } from "console";
import { Usuario } from "../entities/usuarioEntity.js";
import { UsuarioRepository } from "../repository/usuarioRepository.js";
import { ObjectId } from "mongodb";

export class UsuarioController{
    static New(usuario:string ,contra:string ,email:string ,tipo:string ,id:string|undefined=undefined):Usuario {
        return new Usuario(usuario,contra,email,tipo,new ObjectId(id));
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
        //Falta validar error
        return usr;
    }

    static async Update(usr:Usuario){
        const result = await UsuarioRepository.Update(usr)
        return result;
    }

    static async Delete(id:number){
        const result = await UsuarioRepository.Delete(id);
        return result;
    }
}