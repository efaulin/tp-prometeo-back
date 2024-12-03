import { Narrador, NarradorModel } from "../schemas/narratorSchema";
import { HydratedDocument } from 'mongoose';

export class NarradorRepository{
    static async GetOne(id: string): Promise<HydratedDocument<Narrador> | null> {
        try {
            const result = await NarradorModel.findById(id);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async GetAll(): Promise<Narrador[] | undefined> {
        try {
            const narradores = await NarradorModel.find().exec();
            return narradores;
        } catch (error) {
            console.error('Error al obtener los narradores:', error);
            throw error;
        }
    }
    static async Create(name:String): Promise<HydratedDocument<Narrador> | undefined> {
        try {
            const newNarrator = new NarradorModel({
                name: name,
            });
            const result = await newNarrator.save();
            return result;
        } catch (error) {
            console.error('Error al crear el narrador:', error);
            throw error;
        }
    }
    static async Update(id: string, updateFields: Partial<Narrador>): Promise<HydratedDocument<Narrador> | null> {
        try {
            // Usa findByIdAndUpdate para actualizar solo los campos proporcionados
            const updatedNarrator = await NarradorModel.findByIdAndUpdate(id, updateFields, { new: true });
            return updatedNarrator;
        } catch (error) {
            console.error("Error al actualizar narrador en la base de datos:", error);
            throw error;
        }
    }
    static async Delete(id: string): Promise<HydratedDocument<Narrador> | null> {
        try {
            const result = await NarradorModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Error al eliminar narrador:", error);
            throw error;
        }
    }
}