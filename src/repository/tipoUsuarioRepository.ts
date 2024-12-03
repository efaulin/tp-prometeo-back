import { TipoUsuario, TipoUsuarioModel } from "../schemas/userSchema";
import { HydratedDocument } from 'mongoose';

export class TipoUsuarioRepository{
    static async GetOne(id: string): Promise<HydratedDocument<TipoUsuario> | null> {
        try {
            const result = await TipoUsuarioModel.findById(id);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async GetAll(): Promise<TipoUsuario[] | undefined> {
        try {
            const tipoUsuarios = await TipoUsuarioModel.find().exec();
            return tipoUsuarios;
        } catch (error) {
            console.error('Error al obtener los tipoUsuarios:', error);
            throw error;
        }
    }
    static async Create(name:String): Promise<HydratedDocument<TipoUsuario> | undefined> {
        try {
            const newRole = new TipoUsuarioModel({
                name: name,
            });
            const result = await newRole.save();
            return result;
        } catch (error) {
            console.error('Error al crear el tipoUsuario:', error);
            throw error;
        }
    }
    static async Update(id: string, updateFields: Partial<TipoUsuario>): Promise<HydratedDocument<TipoUsuario> | null> {
        try {
            // Usa findByIdAndUpdate para actualizar solo los campos proporcionados
            const updatedRole = await TipoUsuarioModel.findByIdAndUpdate(id, updateFields, { new: true });
            return updatedRole;
        } catch (error) {
            console.error("Error al actualizar tipoUsuario en la base de datos:", error);
            throw error;
        }
    }
    static async Delete(id: string): Promise<HydratedDocument<TipoUsuario> | null> {
        try {
            const result = await TipoUsuarioModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Error al eliminar tipoUsuario:", error);
            throw error;
        }
    }
}