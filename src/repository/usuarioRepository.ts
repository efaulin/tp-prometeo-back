import { Usuario, UsuarioModel } from "../schemas/usuarioSchema";
import { HydratedDocument, Document } from 'mongoose';

export class UsuarioRepository{
    static async GetOne(id: string): Promise<HydratedDocument<Usuario> | null> {
        try {
            const result = await UsuarioModel.findById(id);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async GetAll(): Promise<Usuario[] | undefined> {
        try {
            const usuarios = await UsuarioModel.find().exec();
            return usuarios;
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            throw error;
        }
    }
    static async Create(name:String, pass: String, email:String, tipo:String): Promise<HydratedDocument<Usuario> | undefined> {
        try {
            const newUser = new UsuarioModel({
                username: name,
                password: pass,
                email: email,
                role: tipo,
            });
            const resultado = await newUser.save();
            return resultado;
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            throw error;
        }
    }
    static async Update(id: string, updateFields: Partial<Usuario>): Promise<HydratedDocument<Usuario> | null> {
        try {
            // Usa findByIdAndUpdate para actualizar solo los campos proporcionados
            const updatedUser = await UsuarioModel.findByIdAndUpdate(id, updateFields, { new: true });
            return updatedUser;
        } catch (error) {
            console.error("Error al actualizar usuario en la base de datos:", error);
            throw error;
        }
    }
    static async Delete(id: string): Promise<HydratedDocument<Usuario> | null> {
        try {
            const result = await UsuarioModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            throw error;
        }
    }
}