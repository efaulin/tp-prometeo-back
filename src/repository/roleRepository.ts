import { Role, RoleModel } from "../schemas/userSchema";
import { HydratedDocument } from 'mongoose';

export class RoleRepository{
    static async GetOne(id: string): Promise<HydratedDocument<Role> | null> {
        try {
            const result = await RoleModel.findById(id);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async GetAll(): Promise<Role[] | undefined> {
        try {
            const roles = await RoleModel.find().exec();
            return roles;
        } catch (error) {
            console.error('Error al obtener los roles:', error);
            throw error;
        }
    }
    static async Create(name:String): Promise<HydratedDocument<Role> | undefined> {
        try {
            const newRole = new RoleModel({
                name: name,
            });
            const result = await newRole.save();
            return result;
        } catch (error) {
            console.error('Error al crear el role:', error);
            throw error;
        }
    }
    static async Update(id: string, updateFields: Partial<Role>): Promise<HydratedDocument<Role> | null> {
        try {
            // Usa findByIdAndUpdate para actualizar solo los campos proporcionados
            const updatedRole = await RoleModel.findByIdAndUpdate(id, updateFields, { new: true });
            return updatedRole;
        } catch (error) {
            console.error("Error al actualizar role en la base de datos:", error);
            throw error;
        }
    }
    static async Delete(id: string): Promise<HydratedDocument<Role> | null> {
        try {
            const result = await RoleModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Error al eliminar role:", error);
            throw error;
        }
    }
}