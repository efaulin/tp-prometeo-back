import { Autor, AutorModel } from "../schemas/authorSchema";
import { HydratedDocument } from 'mongoose';

export class AutorRepository{
    static async GetOne(id: string): Promise<HydratedDocument<Autor> | null> {
        try {
            const result = await AutorModel.findById(id);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async GetAll(): Promise<Autor[] | undefined> {
        try {
            const autores = await AutorModel.find().exec();
            return autores;
        } catch (error) {
            console.error('Error al obtener los autores:', error);
            throw error;
        }
    }
    static async Create(name:String): Promise<HydratedDocument<Autor> | undefined> {
        try {
            const newAuthor = new AutorModel({
                name: name,
            });
            const result = await newAuthor.save();
            return result;
        } catch (error) {
            console.error('Error al crear el autor:', error);
            throw error;
        }
    }
    static async Update(id: string, updateFields: Partial<Autor>): Promise<HydratedDocument<Autor> | null> {
        try {
            // Usa findByIdAndUpdate para actualizar solo los campos proporcionados
            const updatedAuthor = await AutorModel.findByIdAndUpdate(id, updateFields, { new: true });
            return updatedAuthor;
        } catch (error) {
            console.error("Error al actualizar autor en la base de datos:", error);
            throw error;
        }
    }
    static async Delete(id: string): Promise<HydratedDocument<Autor> | null> {
        try {
            const result = await AutorModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Error al eliminar autor:", error);
            throw error;
        }
    }
}