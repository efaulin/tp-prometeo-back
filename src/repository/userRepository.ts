import { Role, RoleModel, User, UserModel, UserSubscription } from "../schemas/userSchema";
import { HydratedDocument, Document } from 'mongoose';
import { SuscripcionRepository } from "./subscriptionRepository";
import bcrypt from 'bcrypt';

export class UserRepository{
    static async GetOne(id: string): Promise<HydratedDocument<User> | null> {
        try {
            const result = await UserModel.findById(id);
            if (result) await UserRepository.populateRelations(result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async GetAll(): Promise<User[] | undefined> {
        try {
            const users = await UserModel.find().exec();
            for (let i=0; i < users.length; i++) {
                await UserRepository.populateRelations(users[i]);
            }
            return users;
        } catch (error) {
            console.error('Error al obtener los users:', error);
            throw error;
        }
    }
    static async GetOneByUsername(username: string): Promise<HydratedDocument<User> | null> {
        try {
            const result = await UserModel.findOne({ username: username });
            if (result) await UserRepository.populateRelations(result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async Create(name:string, pass: string, email:string, role:string, subscriptions:UserSubscription[]): Promise<HydratedDocument<User> | undefined | string> {
        try {
            const isSuscripcionsValid = await this.validateSuscripcions(subscriptions);
            const tmpRole = await RoleModel.findById(role);
            if (!tmpRole || !isSuscripcionsValid) {
                return undefined;
            } else if (typeof isSuscripcionsValid == "string") {
                return isSuscripcionsValid;
            }
            const newUser = new UserModel({
                username: name,
                password: bcrypt.hashSync(pass,10),
                email: email,
                role: role,
                subscriptions: subscriptions,
            });
            for (let i = 0; i < newUser.subscriptions.length; i++) {
                newUser.subscriptions[i].userId = newUser._id.toString();
            }
            const result = await newUser.save();
            if (result) await UserRepository.populateRelations(result);
            return result;
        } catch (error) {
            console.error('Error al crear el user:', error);
            throw error;
        }
    }
    static async Update(id: string, updateFields: Partial<User>): Promise<HydratedDocument<User> | null | string> {
        try {
            const subscriptions = updateFields.subscriptions;
            if (subscriptions) {
                const isSuscripcionsValid = await this.validateSuscripcions(subscriptions);
                if (!isSuscripcionsValid) {
                    return "isNotValid";
                } else if (typeof isSuscripcionsValid == "string") {
                    return isSuscripcionsValid;
                }
            }
            if (updateFields.role) {
                const tmpRole = await RoleModel.findById(updateFields.role);
                if (!tmpRole) return null;
            }
            if (updateFields.subscriptions) {
                for (let i = 0; i < updateFields.subscriptions.length; i++) {
                    updateFields.subscriptions[i].userId = id;
                }
            }
            if (updateFields.password) {
                updateFields.password = bcrypt.hashSync(updateFields.password,10);
            }
            // Usa findByIdAndUpdate para actualizar solo los campos proporcionados
            const updatedUser = await UserModel.findByIdAndUpdate(id, updateFields, { new: true });
            if (updatedUser) await UserRepository.populateRelations(updatedUser);
            return updatedUser;
        } catch (error) {
            console.error("Error al actualizar user en la base de datos:", error);
            throw error;
        }
    }
    static async Delete(id: string): Promise<HydratedDocument<User> | null> {
        try {
            const result = await UserModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Error al eliminar user:", error);
            throw error;
        }
    }

    static async populateRelations(user:HydratedDocument<User>) : Promise<void> {
        await user.populate('role')
        await user.populate({ path:'subscriptions.subscriptionId' })
    }

    static async validateSuscripcions(subscriptions: UserSubscription[]) : Promise<string | boolean> {
        let notExistSuscripcion = "";
        let notUniqueSuscripcion = false;
        for (let i=0; i < subscriptions.length && !notExistSuscripcion && !notUniqueSuscripcion; i++) {
            const tmp = subscriptions[i];
            if (!(await SuscripcionRepository.GetOne(tmp.subscriptionRef.toString()))) {
                notExistSuscripcion = tmp.subscriptionRef.toString();
            }
            for (let k=i+1; k < subscriptions.length && !notUniqueSuscripcion; k++) {
                notUniqueSuscripcion = tmp.startDate == subscriptions[k].startDate;
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