import { Host, HostModel } from "../schemas/hostSchema";
import { HydratedDocument } from 'mongoose';

export class HostRepository{
    static async GetOne(id: string): Promise<HydratedDocument<Host> | null> {
        try {
            const result = await HostModel.findById(id);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async GetAll(): Promise<Host[] | undefined> {
        try {
            const hosts = await HostModel.find().exec();
            return hosts;
        } catch (error) {
            console.error('Error al obtener los hosts:', error);
            throw error;
        }
    }
    static async Create(name:String): Promise<HydratedDocument<Host> | undefined> {
        try {
            const newHost = new HostModel({
                name: name,
            });
            const result = await newHost.save();
            return result;
        } catch (error) {
            console.error('Error al crear el host:', error);
            throw error;
        }
    }
    static async Update(id: string, updateFields: Partial<Host>): Promise<HydratedDocument<Host> | null> {
        try {
            // Usa findByIdAndUpdate para actualizar solo los campos proporcionados
            const updatedHost = await HostModel.findByIdAndUpdate(id, updateFields, { new: true });
            return updatedHost;
        } catch (error) {
            console.error("Error al actualizar host en la base de datos:", error);
            throw error;
        }
    }
    static async Delete(id: string): Promise<HydratedDocument<Host> | null> {
        try {
            const result = await HostModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Error al eliminar host:", error);
            throw error;
        }
    }
}