import { Coleccion, ColeccionModel } from "../schemas/coleccionSchema";
import { HydratedDocument } from 'mongoose';

export class ColeccionRepository{
    static async GetOne(id: string): Promise<HydratedDocument<Coleccion> | null> {
        try {
            const result = await ColeccionModel.findById(id);
            return result;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    static async GetAll(): Promise<Coleccion[] | undefined> {
        try {
            const Colecciones = await ColeccionModel.find().exec();
            return Colecciones;
        } catch (error) {
            console.error('Error al obtener las colecciones:', error);
            return undefined;
        }
    }
    static async Create(name:String): Promise<HydratedDocument<Coleccion> | undefined> {
        try {
            const newCol = new ColeccionModel({
                name: name,
            
            });
            const resultado = await newCol.save();
            return resultado;
        } catch (error) {
            console.error('Error al crear la colección:', error);
            return undefined;
        }
    }
    static async Update(id: string, updateFields: Partial<Coleccion>): Promise<HydratedDocument<Coleccion> | null> {
        try {
            // Usa findByIdAndUpdate para actualizar solo los campos proporcionados
            const updatedCol = await ColeccionModel.findByIdAndUpdate(id, updateFields, { new: true });
            return updatedCol;
        } catch (error) {
            console.error("Error al actualizar colección en la base de datos:", error);
            return null;
        }
    }
    static async Delete(id: string): Promise<HydratedDocument<Coleccion> | null> {
        try {
            const result = await ColeccionModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Error al eliminar colección:", error);
            return null;
        }
    }
}