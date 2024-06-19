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

    static controller = db.collection<Usuario>('usuarios');

    static async GetOne(id:string):Promise<Usuario|undefined> {
        const _id = new ObjectId(id);
        const result = await this.controller.findOne({_id});
        return result || undefined;
    }

    static async GetAll():Promise<Usuario[]|undefined>{
        //En caso de error mandar "Undefined"
        return await this.controller.find().toArray();
    }

    static async Create(usr:Usuario):Promise<Usuario|undefined> {
        //Validar no ingrese un "usuario" con id definida (id >= 0)
        //En caso de error mandar "Undefined"
        usr._id = (await this.controller.insertOne(usr)).insertedId;
        return usr;
    }

    static async Update(usr:Usuario):Promise<Usuario|undefined> {
        const obj = usr._id;
        return (await this.controller.findOneAndUpdate({_id: obj}, { $set:usr }, {returnDocument:"after"})) || undefined;
    }

    static async Delete(id:string):Promise<Usuario|undefined> {
        const _id = new ObjectId(id);
        return (await this.controller.findOneAndDelete({_id})) || undefined;
    }
}