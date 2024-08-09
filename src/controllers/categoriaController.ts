import { ObjectId } from "mongodb";
import { Controller } from "./abstractController.js";
import { Categoria } from "../entities/categoriaEntity.js";
import { CategoriaRepository } from "../repository/categoriaRepository.js";

//TODO Manejo de errores GetOne GetAll y Create
export class CategoriaController extends Controller<Categoria>() {
    static New(nombre:string, id:string|undefined=undefined):Categoria {
        return new Categoria(nombre, new ObjectId(id)||undefined);
    }
    
    static async GetAll(){
        const categorias = await CategoriaRepository.GetAll();
        return categorias;
    }

    static async GetOne(id:string){
        const categoria = await CategoriaRepository.GetOne(id);
        return categoria;
    }

    static async Create(ctg:Categoria){
        const idCategoria = await CategoriaRepository.Create(ctg);
        return ctg;
    }

    static async Update(ctg:Categoria){
        const result = await CategoriaRepository.Update(ctg)
        return result;
    }

    static async Delete(id:string){
        const result = await CategoriaRepository.Delete(id);
        return result;
    }
}