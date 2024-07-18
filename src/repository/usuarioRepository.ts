import { ObjectId } from "mongodb";
import { Usuario } from "../entities/usuarioEntity.js";
import { db } from "../shared/db/conn.js";
import { UsuarioController } from "../controllers/usuarioController.js";
import { Repository } from "./abstractRepository.js";

//TODO Manejo de errores GetOne GetAll y Create
export class UsuarioRepository extends Repository<Usuario>(){
    static controller = db.collection<Usuario>('usuarios');

    /**
     * Busca un **Usuario** por ID.
     * @param id Atributo id a buscar.
     * @returns En caso de encontrar un **Usuario** con el mismo `id` lo devuelve. Caso contrario, devuelve **undefined**.
     * @async
     */
    static async GetOne(id:string):Promise<Usuario|undefined> {
        const _id = new ObjectId(id);
        const result = await this.controller.findOne({_id});
        return result || undefined;
    }

    /**
     * Devuelve todos los **Usuario**.
     * @returns Colleccion de **Usuario**'s. En caso de error, devuelve **undefined**.
     * @async
     */
    static async GetAll():Promise<Usuario[]|undefined>{
        //En caso de error mandar "Undefined"
        return await this.controller.find().toArray();
    }

    /**
     * Carga un **Usuario** a la BBDD.
     * @param usr Objeto **Usuario** a subir.
     * @returns En caso de haber cargado, devuelve el **Usuario** con `id`. Caso contrario, devuelve **undefined**.
     * @async
     */
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