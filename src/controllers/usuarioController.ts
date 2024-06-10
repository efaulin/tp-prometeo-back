import { Usuario } from "../entities/usuarioEntity.js";

export class UsuarioController{
    static NewUsuario(id:number=-1, usr:string ,pass:string ,email:string ,tipo:string ):Usuario {
        return new Usuario(id,usr,pass,email,tipo);
    }
}