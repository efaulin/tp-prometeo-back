import { Author, AuthorModel } from "../schemas/authorSchema";
import { HydratedDocument } from 'mongoose';

export class AuthorRepository{
    static async GetOne(id: string): Promise<HydratedDocument<Author> | null> {
        try {
            const result = await AuthorModel.findById(id);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async GetAll(): Promise<Author[] | undefined> {
        try {
            const authors = await AuthorModel.find().exec();
            return authors;
        } catch (error) {
            console.error('Error al obtener los authors:', error);
            throw error;
        }
    }
    static async Create(name:String): Promise<HydratedDocument<Author> | undefined> {
        try {
            const newAuthor = new AuthorModel({
                name: name,
            });
            const result = await newAuthor.save();
            return result;
        } catch (error) {
            console.error('Error al crear el author:', error);
            throw error;
        }
    }
    static async Update(id: string, updateFields: Partial<Author>): Promise<HydratedDocument<Author> | null> {
        try {
            // Usa findByIdAndUpdate para actualizar solo los campos proporcionados
            const updatedAuthor = await AuthorModel.findByIdAndUpdate(id, updateFields, { new: true });
            return updatedAuthor;
        } catch (error) {
            console.error("Error al actualizar author en la base de datos:", error);
            throw error;
        }
    }
    static async Delete(id: string): Promise<HydratedDocument<Author> | null> {
        try {
            const result = await AuthorModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Error al eliminar author:", error);
            throw error;
        }
    }
}