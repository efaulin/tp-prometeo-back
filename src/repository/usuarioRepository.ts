import { TipoUsuario, TipoUsuarioModel, Usuario, UsuarioModel, UsuarioSuscripcion } from "../schemas/usuarioSchema";
import { HydratedDocument, Document } from 'mongoose';
import { SuscripcionRepository } from "./suscripcionRepository";
import bcrypt from 'bcrypt';

export class UsuarioRepository{
    static async GetOne(id: string): Promise<HydratedDocument<Usuario> | null> {
        try {
            const result = await UsuarioModel.findById(id);
            if (result) await UsuarioRepository.populateRelations(result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async GetAll(): Promise<Usuario[] | undefined> {
        try {
            const usuarios = await UsuarioModel.find().exec();
            for (let i=0; i < usuarios.length; i++) {
                await UsuarioRepository.populateRelations(usuarios[i]);
            }
            return usuarios;
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            throw error;
        }
    }
    static async GetOneByUsername(username: string): Promise<HydratedDocument<Usuario> | null> {
        try {
            const result = await UsuarioModel.findOne({ username: username });
            if (result) await UsuarioRepository.populateRelations(result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async Create(name:string, pass: string, email:string, role:string, suscripcions:UsuarioSuscripcion[]): Promise<HydratedDocument<Usuario> | undefined | string> {
        try {
            const isSuscripcionsValid = await this.validateSuscripcions(suscripcions);
            const tmpRole = await TipoUsuarioModel.findById(role);
            if (!tmpRole || !isSuscripcionsValid) {
                return undefined;
            } else if (typeof isSuscripcionsValid == "string") {
                return isSuscripcionsValid;
            }
            const newUser = new UsuarioModel({
                username: name,
                password: bcrypt.hashSync(pass,10),
                email: email,
                role: role,
                suscripcions: suscripcions,
            });
            for (let i = 0; i < newUser.suscripcions.length; i++) {
                newUser.suscripcions[i].userId = newUser._id.toString();
            }
            const result = await newUser.save();
            if (result) await UsuarioRepository.populateRelations(result);
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
            if (updateFields.role) {
                const tmpRole = await TipoUsuarioModel.findById(updateFields.role);
                if (!tmpRole) return null;
            }
            if (updateFields.suscripcions) {
                for (let i = 0; i < updateFields.suscripcions.length; i++) {
                    updateFields.suscripcions[i].userId = id;
                }
            }
            if (updateFields.password) {
                updateFields.password = bcrypt.hashSync(updateFields.password,10);
            }
            // Usa findByIdAndUpdate para actualizar solo los campos proporcionados
            const updatedUser = await UsuarioModel.findByIdAndUpdate(id, updateFields, { new: true });
            if (updatedUser) await UsuarioRepository.populateRelations(updatedUser);
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

    static async populateRelations(user:HydratedDocument<Usuario>) : Promise<void> {
        await user.populate('role')
        await user.populate({ path:'suscripcions.suscripcionId' })
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