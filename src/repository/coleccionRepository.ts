import { Coleccion } from "../schemas/coleccionSchema.js";
import { HydratedDocument, Document } from 'mongoose';
interface ColeccionDocument extends Document {
    name: string;
   
}
export class ColeccionRepository{
    static async GetOne(id: string): Promise<HydratedDocument<ColeccionDocument> | null> {
        try {
            const result = await Coleccion.findById(id);
            return result;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    static async GetAll(): Promise<ColeccionDocument[] | undefined> {
        try {
            const Colecciones = await Coleccion.find().exec();
            return Colecciones;
        } catch (error) {
            console.error('Error al obtener las colecciones:', error);
            return undefined;
        }
    }
    static async Create(name:String): Promise<ColeccionDocument | undefined> {
        try {
            const newCol = new Coleccion({
                name: name,
            
            });
            const resultado = await newCol.save();
            return resultado;
        } catch (error) {
            console.error('Error al crear la colección:', error);
            return undefined;
        }
    }
    static async Update(id: string, updateFields: Partial<ColeccionDocument>): Promise<ColeccionDocument | null> {
        try {
            // Usa findByIdAndUpdate para actualizar solo los campos proporcionados
            const updatedCol = await Coleccion.findByIdAndUpdate(id, updateFields, { new: true });
            return updatedCol;
        } catch (error) {
            console.error("Error al actualizar colección en la base de datos:", error);
            return null;
        }
    }
    static async Delete(id: string): Promise<ColeccionDocument | null> {
        try {
            const result = await Coleccion.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Error al eliminar colección:", error);
            return null;
        }
    }
}