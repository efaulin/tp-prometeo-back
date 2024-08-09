import { Usuario } from "../schemas/usuarioSchema.js";
import { HydratedDocument, Document } from 'mongoose';

interface UsuarioDocument extends Document {
    username: string;
    password: string;
    email: string;
    role: string;
}
export class UsuarioRepository{
    static async GetOne(id: string): Promise<HydratedDocument<UsuarioDocument> | null> {
        try {
            const result = await Usuario.findById(id);
            return result;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    static async GetAll(): Promise<UsuarioDocument[] | undefined> {
        try {
            const usuarios = await Usuario.find().exec();
            return usuarios;
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            return undefined;
        }
    }
    static async Create(name:String, pass: String, email:String, tipo:String): Promise<UsuarioDocument | undefined> {
        try {
            const newUser = new Usuario({
                username: name,
                password: pass,
                email: email,
                role: tipo,
            });
            const resultado = await newUser.save();
            return resultado;
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            return undefined;
        }
    }
    static async Update(id: string, updateFields: Partial<UsuarioDocument>): Promise<UsuarioDocument | null> {
        try {
            // Usa findByIdAndUpdate para actualizar solo los campos proporcionados
            const updatedUser = await Usuario.findByIdAndUpdate(id, updateFields, { new: true });
            return updatedUser;
        } catch (error) {
            console.error("Error al actualizar usuario en la base de datos:", error);
            return null;
        }
    }
    static async Delete(id: string): Promise<UsuarioDocument | null> {
        try {
            const result = await Usuario.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            return null;
        }
    }
}