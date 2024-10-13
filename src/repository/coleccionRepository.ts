import { Ref } from "@typegoose/typegoose";
import { Categoria } from "../schemas/categoriaSchema.js";
import { Coleccion, ColeccionModel } from "../schemas/coleccionSchema";
import { HydratedDocument } from 'mongoose';
import { CategoriaRepository } from "./categoriaRepository.js";

export class ColeccionRepository{
    static async GetOne(id: string): Promise<HydratedDocument<Coleccion> | null> {
        try {
            const result = await ColeccionModel.findById(id);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async GetAll(): Promise<Coleccion[] | undefined> {
        try {
            const Colecciones = await ColeccionModel.find().exec();
            return Colecciones;
        } catch (error) {
            console.error('Error al obtener las colecciones:', error);
            throw error;
        }
    }
    static async Create(name:String, categories:string[]): Promise<HydratedDocument<Coleccion> | string> {
        try {
            //Reviso que todos los id que recibo en "categories" existan en la BBDD
            let categoryNotExist = "";
            for (let i = 0; i < categories.length && !categoryNotExist; i++) {
                const tmp = await CategoriaRepository.GetOne(categories[i]);
                if (tmp == null) {
                    categoryNotExist = categories[i];
                };
            }
            if (!categoryNotExist) {
                //Si todas las categorias existen, creo la coleccion
                const newCol = new ColeccionModel({
                    name: name,
                    categories: categories,
                });
                const result = await newCol.save();
                return result;
            } else {
                return categoryNotExist;
            }
        } catch (error) {
            console.error('Error al crear la colección:', error);
            throw error;
        }
    }
    static async Update(id: string, updateFields: Partial<Coleccion>): Promise<HydratedDocument<Coleccion> | null | string> {
        try {
            let categoryNotExist = "";
            if (updateFields.categories) {
                //Reviso que todos los id que recibo en "categories" existan en la BBDD
                const categories = updateFields.categories!;
                for (let i = 0; i < categories.length && !categoryNotExist; i++) {
                    const tmp = await CategoriaRepository.GetOne(categories[i].toString());
                    if (tmp == null) {
                        categoryNotExist = categories[i].toString();
                    };
                }
            }
            if (!categoryNotExist) {
                // Usa findByIdAndUpdate para actualizar solo los campos proporcionados
                const updatedCol = await ColeccionModel.findByIdAndUpdate(id, updateFields, { new: true });
                return updatedCol;
            } else {
                return categoryNotExist;
            }
        } catch (error) {
            console.error("Error al actualizar colección en la base de datos:", error);
            throw error;
        }
    }
    static async Delete(id: string): Promise<HydratedDocument<Coleccion> | null> {
        try {
            const result = await ColeccionModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Error al eliminar colección:", error);
            throw error;
        }
    }
}