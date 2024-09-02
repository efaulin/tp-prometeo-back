import { Categoria } from "../schemas/categoriaSchema.js";
import { HydratedDocument, Document } from "mongoose";

interface CategoriaDocument extends Document{
    name: string;
}

export class CategoriaRepository{

    /**
     * Busca una **Categoria** por ID.
     * @param id Atributo id a buscar.
     * @returns En caso de encontrar una **Categoria** con el mismo `id` lo devuelve. Caso contrario, devuelve **undefined**.
     * @async
     */
    static async GetOne(id:string): Promise<HydratedDocument<CategoriaDocument> | null> {
        try {
            const result = await Categoria.findById(id);
            return result;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    /**
     * Devuelve todas las **Categorias**.
     * @returns Colleccion de **Categoria**'s. En caso de error, devuelve **undefined**.
     * @async
     */
    static async GetAll(): Promise<CategoriaDocument[] | undefined>{
        try {
            const categorias = await Categoria.find().exec();
            return categorias;
        } catch (error) {
            console.error("Error al obtener las categorias:", error);
            return undefined;
        }
    }

    /**
     * Carga una **Categoria** a la BBDD.
     * @param categoryName Nombre de la **Categoria** a subir.
     * @returns En caso de haber cargado, devuelve la **Categoria** con `id`. Caso contrario, devuelve **undefined**.
     * @async
     */
    static async Create(categoryName:string): Promise<HydratedDocument<CategoriaDocument>|undefined> {
        try {
            const newCategory = new Categoria({
                name: categoryName
            });
            const result = await newCategory.save();
            return result;
        } catch (error) {
            console.error("Error al crear la categoria:", error);
            return undefined;
        }
    }

    /**
     * Modifica una **Categoria** de la BBDD.
     * @param id de la **Categoria** a subir.
     * @param updateFields Objeto Partial<CategoriaDocument> con los valores a modificar.
     * @returns En caso de haber cargado, devuelve la **Categoria** con los cambios. Caso contrario, devuelve **null**.
     * @async
     */
    static async Update(id:string, updateFields: Partial<CategoriaDocument>): Promise<HydratedDocument<CategoriaDocument>|null> {
        try {
            // Usa findByIdAndUpdate para actualizar solo los campos proporcionados
            const updatedCategory = await Categoria.findByIdAndUpdate(id, updateFields, { new: true });
            return updatedCategory;
        } catch (error) {
            console.error("Error al actualizar la categoria en la base de datos:", error);
            return null;
        }
    }

    /**
     * Elimina una **Categoria** de la BBDD.
     * @param id de la **Categoria** a eliminar.
     * @returns En caso de exito, devuelve la **Categoria** eliminada. Caso contrario, devuelve **undefined**.
     * @async
     */
    static async Delete(id:string):Promise<HydratedDocument<CategoriaDocument> | null> {
        try {
            const result = await Categoria.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Error al eliminar la categoria:", error);
            return null;
        }
    }
}