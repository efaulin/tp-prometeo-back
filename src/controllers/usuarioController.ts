import { Usuario } from "../entities/usuarioEntity.js";

export class UsuarioController{
    static New(id:number=-1, usuario:string ,contra:string ,email:string ,tipo:string ):Usuario {
        return new Usuario(id,usuario,contra,email,tipo);
    }
}