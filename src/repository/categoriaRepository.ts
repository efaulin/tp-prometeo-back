import { ObjectId } from "mongodb";
import { db } from "../shared/db/conn.js";
import { Repository } from "./abstractRepository.js";
import { Categoria } from "../entities/categoriaEntity.js";

//TODO Manejo de errores GetOne GetAll y Create
export class CategoriaRepository extends Repository<Categoria>(){
    static controller = db.collection<Categoria>('categoria');

    /**
     * Busca una **Categoria** por ID.
     * @param id Atributo id a buscar.
     * @returns En caso de encontrar una **Categoria** con el mismo `id` lo devuelve. Caso contrario, devuelve **undefined**.
     * @async
     */
    static async GetOne(id:string):Promise<Categoria|undefined> {
        const _id = new ObjectId(id);
        const result = await this.controller.findOne({_id});
        return result || undefined;
    }

    /**
     * Devuelve todas las **Categorias**.
     * @returns Colleccion de **Categoria**'s. En caso de error, devuelve **undefined**.
     * @async
     */
    static async GetAll():Promise<Categoria[]|undefined>{
        //En caso de error mandar "Undefined"
        return await this.controller.find().toArray();
    }

    /**
     * Carga una **Categoria** a la BBDD.
     * @param usr Objeto **Categoria** a subir.
     * @returns En caso de haber cargado, devuelve la **Categoria** con `id`. Caso contrario, devuelve **undefined**.
     * @async
     */
    static async Create(ctg:Categoria):Promise<Categoria|undefined> {
        //Validar no ingrese un "usuario" con id definida (id >= 0)
        //En caso de error mandar "Undefined"
        ctg._id = (await this.controller.insertOne(ctg)).insertedId;
        return ctg;
    }

    static async Update(ctg:Categoria):Promise<Categoria|undefined> {
        const obj = ctg._id;
        return (await this.controller.findOneAndUpdate({_id: obj}, { $set:ctg }, {returnDocument:"after"})) || undefined;
    }

    static async Delete(id:string):Promise<Categoria|undefined> {
        const _id = new ObjectId(id);
        return (await this.controller.findOneAndDelete({_id})) || undefined;
    }
}