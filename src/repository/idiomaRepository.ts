import { Idioma, IdiomaModel } from "../schemas/languageSchema";
import { HydratedDocument } from 'mongoose';

export class IdiomaRepository{
    static async GetOne(id: string): Promise<HydratedDocument<Idioma> | null> {
        try {
            const result = await IdiomaModel.findById(id);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async GetAll(): Promise<Idioma[] | undefined> {
        try {
            const idiomas = await IdiomaModel.find().exec();
            return idiomas;
        } catch (error) {
            console.error('Error al obtener los idiomas:', error);
            throw error;
        }
    }
    static async Create(name:String): Promise<HydratedDocument<Idioma> | undefined> {
        try {
            const newLang = new IdiomaModel({
                name: name,
            });
            const result = await newLang.save();
            return result;
        } catch (error) {
            console.error('Error al crear el idioma:', error);
            throw error;
        }
    }
    static async Update(id: string, updateFields: Partial<Idioma>): Promise<HydratedDocument<Idioma> | null> {
        try {
            // Usa findByIdAndUpdate para actualizar solo los campos proporcionados
            const updatedLang = await IdiomaModel.findByIdAndUpdate(id, updateFields, { new: true });
            return updatedLang;
        } catch (error) {
            console.error("Error al actualizar idioma en la base de datos:", error);
            throw error;
        }
    }
    static async Delete(id: string): Promise<HydratedDocument<Idioma> | null> {
        try {
            const result = await IdiomaModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Error al eliminar idioma:", error);
            throw error;
        }
    }
}