import { Usuario, UsuarioModel, UsuarioSuscripcion } from "../schemas/usuarioSchema";
import { HydratedDocument, Document } from 'mongoose';
import { SuscripcionRepository } from "./suscripcionRepository";

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
    static async Create(name:String, pass: String, email:String, role:String, suscripcions:UsuarioSuscripcion[]): Promise<HydratedDocument<Usuario> | undefined | string> {
        try {
            const isSuscripcionsValid = await this.validateSuscripcions(suscripcions);
            if (!isSuscripcionsValid) {
                return undefined;
            } else if (typeof isSuscripcionsValid == "string") {
                return isSuscripcionsValid;
            }
            const newUser = new UsuarioModel({
                username: name,
                password: pass,
                email: email,
                role: role,
                suscripcions: suscripcions,
            });
            const result = await newUser.save();
            return result;
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            throw error;
        }
    }
    static async Update(id: string, updateFields: Partial<Usuario>): Promise<HydratedDocument<Usuario> | null | string> {
        try {
            const suscripcions = updateFields.suscripcions;
            if (suscripcions) {
                const isSuscripcionsValid = await this.validateSuscripcions(suscripcions);
                if (!isSuscripcionsValid) {
                    return "isNotValid";
                } else if (typeof isSuscripcionsValid == "string") {
                    return isSuscripcionsValid;
                }
            }
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

    static async validateSuscripcions(suscripcions: UsuarioSuscripcion[]) : Promise<string | boolean> {
        let notExistSuscripcion = "";
        let notUniqueSuscripcion = false;
        for (let i=0; i < suscripcions.length && !notExistSuscripcion && !notUniqueSuscripcion; i++) {
            const tmp = suscripcions[i];
            if (!(await SuscripcionRepository.GetOne(tmp.suscripcionId.toString()))) {
                notExistSuscripcion = tmp.suscripcionId.toString();
            }
            for (let k=i+1; k < suscripcions.length && !notUniqueSuscripcion; k++) {
                notUniqueSuscripcion = tmp.startDate == suscripcions[k].startDate;
            }
        }
        if (notExistSuscripcion) {
            return notExistSuscripcion;
        }
        if (notUniqueSuscripcion) {
            return false;
        }
        return true;
    }
}