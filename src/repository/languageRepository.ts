import { Language, LanguageModel } from "../schemas/languageSchema";
import { HydratedDocument } from 'mongoose';

export class LanguageRepository{
    static async GetOne(id: string): Promise<HydratedDocument<Language> | null> {
        try {
            const result = await LanguageModel.findById(id);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async GetAll(): Promise<Language[] | undefined> {
        try {
            const languages = await LanguageModel.find().exec();
            return languages;
        } catch (error) {
            console.error('Error al obtener los languages:', error);
            throw error;
        }
    }
    static async Create(name:String): Promise<HydratedDocument<Language> | undefined> {
        try {
            const newLang = new LanguageModel({
                name: name,
            });
            const result = await newLang.save();
            return result;
        } catch (error) {
            console.error('Error al crear el language:', error);
            throw error;
        }
    }
    static async Update(id: string, updateFields: Partial<Language>): Promise<HydratedDocument<Language> | null> {
        try {
            // Usa findByIdAndUpdate para actualizar solo los campos proporcionados
            const updatedLang = await LanguageModel.findByIdAndUpdate(id, updateFields, { new: true });
            return updatedLang;
        } catch (error) {
            console.error("Error al actualizar language en la base de datos:", error);
            throw error;
        }
    }
    static async Delete(id: string): Promise<HydratedDocument<Language> | null> {
        try {
            const result = await LanguageModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Error al eliminar language:", error);
            throw error;
        }
    }
}