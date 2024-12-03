import { Conductor, ConductorModel } from "../schemas/hostSchema";
import { HydratedDocument } from 'mongoose';

export class ConductorRepository{
    static async GetOne(id: string): Promise<HydratedDocument<Conductor> | null> {
        try {
            const result = await ConductorModel.findById(id);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async GetAll(): Promise<Conductor[] | undefined> {
        try {
            const conductores = await ConductorModel.find().exec();
            return conductores;
        } catch (error) {
            console.error('Error al obtener los conductores:', error);
            throw error;
        }
    }
    static async Create(name:String): Promise<HydratedDocument<Conductor> | undefined> {
        try {
            const newHost = new ConductorModel({
                name: name,
            });
            const result = await newHost.save();
            return result;
        } catch (error) {
            console.error('Error al crear el conductor:', error);
            throw error;
        }
    }
    static async Update(id: string, updateFields: Partial<Conductor>): Promise<HydratedDocument<Conductor> | null> {
        try {
            // Usa findByIdAndUpdate para actualizar solo los campos proporcionados
            const updatedHost = await ConductorModel.findByIdAndUpdate(id, updateFields, { new: true });
            return updatedHost;
        } catch (error) {
            console.error("Error al actualizar conductor en la base de datos:", error);
            throw error;
        }
    }
    static async Delete(id: string): Promise<HydratedDocument<Conductor> | null> {
        try {
            const result = await ConductorModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Error al eliminar conductor:", error);
            throw error;
        }
    }
}