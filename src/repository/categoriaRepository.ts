import { Categoria, CategoriaModel } from "../schemas/categorySchema";
import { HydratedDocument, Document } from "mongoose";

export class CategoriaRepository{

    /**
     * Busca una **Categoria** por ID.
     * @param id Atributo id a buscar.
     * @returns En caso de encontrar una **Categoria** con el mismo `id` lo devuelve. Caso contrario, devuelve **undefined**.
     * @async
     */
    static async GetOne(id:string): Promise<HydratedDocument<Categoria> | null> {
        try {
            const result = await CategoriaModel.findById(id);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    /**
     * Devuelve todas las **Categorias**.
     * @returns Colleccion de **Categoria**'s. En caso de error, devuelve **undefined**.
     * @async
     */
    static async GetAll(): Promise<Categoria[] | undefined>{
        try {
            const categorias = await CategoriaModel.find().exec();
            return categorias;
        } catch (error) {
            console.error("Error al obtener las categorias:", error);
            throw error;
        }
    }

    /**
     * Carga una **Categoria** a la BBDD.
     * @param categoryName Nombre de la **Categoria** a subir.
     * @returns En caso de haber cargado, devuelve la **Categoria** con `id`. Caso contrario, devuelve **undefined**.
     * @async
     */
    static async Create(categoryName:string): Promise<HydratedDocument<Categoria> | undefined> {
        try {
            const newCategory = new CategoriaModel({
                name: categoryName
            });
            const result = await newCategory.save();
            return result;
        } catch (error) {
            console.error("Error al crear la categoria:", error);
            throw error;
        }
    }

    /**
     * Modifica una **Categoria** de la BBDD.
     * @param id de la **Categoria** a subir.
     * @param updateFields Objeto Partial<CategoriaDocument> con los valores a modificar.
     * @returns En caso de haber cargado, devuelve la **Categoria** con los cambios. Caso contrario, devuelve **null**.
     * @async
     */
    static async Update(id:string, updateFields: Partial<Categoria>): Promise<HydratedDocument<Categoria> | null> {
        try {
            // Usa findByIdAndUpdate para actualizar solo los campos proporcionados
            const updatedCategory = await CategoriaModel.findByIdAndUpdate(id, updateFields, { new: true });
            return updatedCategory;
        } catch (error) {
            console.error("Error al actualizar la categoria en la base de datos:", error);
            throw error;
        }
    }

    /**
     * Elimina una **Categoria** de la BBDD.
     * @param id de la **Categoria** a eliminar.
     * @returns En caso de exito, devuelve la **Categoria** eliminada. Caso contrario, devuelve **undefined**.
     * @async
     */
    static async Delete(id:string):Promise<HydratedDocument<Categoria> | null> {
        try {
            const result = await CategoriaModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Error al eliminar la categoria:", error);
            throw error;
        }
    }
}