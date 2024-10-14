import { Capitulo, CapituloModel } from "../schemas/capituloSchema";
import { HydratedDocument } from 'mongoose';
import { ColeccionRepository } from "./coleccionRepository";

export class CapituloRepository{
    static async GetOne(id: string): Promise<HydratedDocument<Capitulo> | null> {
        try {
            const result = await CapituloModel.findById(id);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async GetAll(): Promise<Capitulo[] | undefined> {
        try {
            const chapters = await CapituloModel.find().exec();
            return chapters;
        } catch (error) {
            console.error('Error al obtener los capitulos:', error);
            throw error;
        }
    }
    
    static async Create(tmpCap:Partial<Capitulo>): Promise<HydratedDocument<Capitulo> | null> {
        try {
            const tmpCol = await ColeccionRepository.GetOne(tmpCap.coleccionId!.toString());
            if (tmpCol) {
                const newCap = new CapituloModel({ ...tmpCap });
                const result = await newCap.save();
                return result;
            }
            return null;
        } catch (error) {
            console.error('Error al crear el capitulo:', error);
            throw error;
        }
    }
    
    static async Update(id: string, updateFields: Partial<Capitulo>): Promise<HydratedDocument<Capitulo> | null > {
        try {
            if (updateFields.coleccionId) {
                const tmpCol = await ColeccionRepository.GetOne(updateFields.coleccionId!.toString());
                if (!tmpCol) {
                    return null;
                }
            }
            const updatedCol = await CapituloModel.findByIdAndUpdate(id, updateFields, { new: true });
            return updatedCol;
        } catch (error) {
            console.error("Error al actualizar capitulo en la base de datos:", error);
            throw error;
        }
    }

    static async Delete(id: string): Promise<HydratedDocument<Capitulo> | null> {
        try {
            const result = await CapituloModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Error al eliminar capitulo:", error);
            throw error;
        }
    }
}