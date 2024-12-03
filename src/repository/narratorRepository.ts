import { Narrator, NarratorModel } from "../schemas/narratorSchema";
import { HydratedDocument } from 'mongoose';

export class NarratorRepository{
    static async GetOne(id: string): Promise<HydratedDocument<Narrator> | null> {
        try {
            const result = await NarratorModel.findById(id);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async GetAll(): Promise<Narrator[] | undefined> {
        try {
            const narrators = await NarratorModel.find().exec();
            return narrators;
        } catch (error) {
            console.error('Error al obtener los narrators:', error);
            throw error;
        }
    }
    static async Create(name:String): Promise<HydratedDocument<Narrator> | undefined> {
        try {
            const newNarrator = new NarratorModel({
                name: name,
            });
            const result = await newNarrator.save();
            return result;
        } catch (error) {
            console.error('Error al crear el narrator:', error);
            throw error;
        }
    }
    static async Update(id: string, updateFields: Partial<Narrator>): Promise<HydratedDocument<Narrator> | null> {
        try {
            // Usa findByIdAndUpdate para actualizar solo los campos proporcionados
            const updatedNarrator = await NarratorModel.findByIdAndUpdate(id, updateFields, { new: true });
            return updatedNarrator;
        } catch (error) {
            console.error("Error al actualizar narrator en la base de datos:", error);
            throw error;
        }
    }
    static async Delete(id: string): Promise<HydratedDocument<Narrator> | null> {
        try {
            const result = await NarratorModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Error al eliminar narrator:", error);
            throw error;
        }
    }
}