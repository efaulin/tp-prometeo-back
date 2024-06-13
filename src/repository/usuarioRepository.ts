import { ObjectId } from "mongodb";
import { Usuario } from "../entities/usuarioEntity.js";
import { db } from "../shared/db/conn.js";
import { UsuarioController } from "../controllers/usuarioController.js";


export class UsuarioRepository{
    //Guardo en memoria
    /*static usuarios = [
        new Usuario(
            101,
            "pandugat",
            "xd",
            "efaulin@frro.utn.edu.ar",
            "BCSPN"
        ),
        new Usuario(
            102,
            "hborelli",
            "pass",
            "hborelli@frro.utn.edu.ar",
            "type2"
        ),
        new Usuario(
            103,
            "vcoyle",
            "pass2",
            "vcoyle@frro.utn.edu.ar",
            "type3"
        ),
    ];*/

    static usuarios = db.collection<Usuario>('usuarios');

    static async GetOne(id:string):Promise<Usuario|undefined> {
        const _id = new ObjectId(id);
        const result = await this.usuarios.findOne(_id);
        if (result) {
            const usuario = UsuarioController.New(result.usuario, result.contra, result.email, result.tipo, result._id.toString());
            return usuario;
        }
        return undefined;
    }

    static async GetAll():Promise<Usuario[]|undefined>{
        //En caso de error mandar "Undefined"
        return await this.usuarios.find().toArray();
    }

    static async Create(usr:Usuario):Promise<number|undefined> {
        //Validar no ingrese un "usuario" con id definida (id >= 0)
        //En caso de error mandar "Undefined"
        const usuario = this.usuarios.insertOne();
    }

    static async Update(usr:Usuario):Promise<boolean> {
        const indUsr = this.usuarios.findIndex((tmpUsr) => tmpUsr.id === usr.id);
        if (indUsr != -1) {
            usr.id = this.usuarios[indUsr].id;
            this.usuarios[indUsr] = usr;
            return await true;
        }
        else {
            return await false;
        }
    }

    static async Delete(id:number):Promise<boolean> {
        const oneUsr:Usuario|undefined = this.usuarios.find((usr) => usr.id === id);
        if (oneUsr) {
            this.usuarios.splice(this.usuarios.indexOf(oneUsr),1);
            return await true;
        }
        else {
            return await false;
        }
    }
}