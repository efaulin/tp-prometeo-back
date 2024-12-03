import { Category, CategoryModel } from "../schemas/categorySchema";
import { HydratedDocument, Document } from "mongoose";

export class CategoryRepository{

    /**
     * Busca una **Category** por ID.
     * @param id Atributo id a buscar.
     * @returns En caso de encontrar una **Category** con el mismo `id` lo devuelve. Caso contrario, devuelve **undefined**.
     * @async
     */
    static async GetOne(id:string): Promise<HydratedDocument<Category> | null> {
        try {
            const result = await CategoryModel.findById(id);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    /**
     * Devuelve todas las **Categories**.
     * @returns Colleccion de **Category**'s. En caso de error, devuelve **undefined**.
     * @async
     */
    static async GetAll(): Promise<Category[] | undefined>{
        try {
            const categories = await CategoryModel.find().exec();
            return categories;
        } catch (error) {
            console.error("Error al obtener las categories:", error);
            throw error;
        }
    }

    /**
     * Carga una **Category** a la BBDD.
     * @param categoryName Nombre de la **Category** a subir.
     * @returns En caso de haber cargado, devuelve la **Category** con `id`. Caso contrario, devuelve **undefined**.
     * @async
     */
    static async Create(categoryName:string): Promise<HydratedDocument<Category> | undefined> {
        try {
            const newCategory = new CategoryModel({
                name: categoryName
            });
            const result = await newCategory.save();
            return result;
        } catch (error) {
            console.error("Error al crear la category:", error);
            throw error;
        }
    }

    /**
     * Modifica una **Category** de la BBDD.
     * @param id de la **Category** a subir.
     * @param updateFields Objeto Partial<CategoryDocument> con los valores a modificar.
     * @returns En caso de haber cargado, devuelve la **Category** con los cambios. Caso contrario, devuelve **null**.
     * @async
     */
    static async Update(id:string, updateFields: Partial<Category>): Promise<HydratedDocument<Category> | null> {
        try {
            // Usa findByIdAndUpdate para actualizar solo los campos proporcionados
            const updatedCategory = await CategoryModel.findByIdAndUpdate(id, updateFields, { new: true });
            return updatedCategory;
        } catch (error) {
            console.error("Error al actualizar la category en la base de datos:", error);
            throw error;
        }
    }

    /**
     * Elimina una **Category** de la BBDD.
     * @param id de la **Category** a eliminar.
     * @returns En caso de exito, devuelve la **Category** eliminada. Caso contrario, devuelve **undefined**.
     * @async
     */
    static async Delete(id:string):Promise<HydratedDocument<Category> | null> {
        try {
            const result = await CategoryModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Error al eliminar la category:", error);
            throw error;
        }
    }
}