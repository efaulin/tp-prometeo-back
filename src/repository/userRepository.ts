import { Role, RoleModel, User, UserModel, UserSubscription } from "../schemas/userSchema";
import { HydratedDocument, Document } from 'mongoose';
import { SubscriptionRepository } from "./subscriptionRepository";
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
            const isSubscriptionsValid = await this.validateSubscriptions(subscriptions);
            const tmpRole = await RoleModel.findById(role);
            if (!tmpRole || !isSubscriptionsValid) {
                return undefined;
            } else if (typeof isSubscriptionsValid == "string") {
                return isSubscriptionsValid;
            }
            const newUser = new UserModel({
                username: name,
                password: bcrypt.hashSync(pass,10),
                email: email,
                roleRef: role,
                subscriptionsRef: subscriptions,
            });
            for (let i = 0; i < newUser.subscriptionsRef.length; i++) {
                newUser.subscriptionsRef[i].userId = newUser._id.toString();
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
            const subscriptions = updateFields.subscriptionsRef;
            if (subscriptions) {
                const isSubscriptionsValid = await this.validateSubscriptions(subscriptions);
                if (!isSubscriptionsValid) {
                    return "isNotValid";
                } else if (typeof isSubscriptionsValid == "string") {
                    return isSubscriptionsValid;
                }
            }
            if (updateFields.roleRef) {
                const tmpRole = await RoleModel.findById(updateFields.roleRef);
                if (!tmpRole) return null;
            }
            if (updateFields.subscriptionsRef) {
                for (let i = 0; i < updateFields.subscriptionsRef.length; i++) {
                    updateFields.subscriptionsRef[i].userId = id;
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
        await user.populate('roleRef')
        await user.populate({ path:'subscriptions.subscriptionRef' })
    }

    static async validateSubscriptions(subscriptions: UserSubscription[]) : Promise<string | boolean> {
        let notExistSubscription = "";
        let notUniqueSubscription = false;
        for (let i=0; i < subscriptions.length && !notExistSubscription && !notUniqueSubscription; i++) {
            const tmp = subscriptions[i];
            if (!(await SubscriptionRepository.GetOne(tmp.subscriptionRef.toString()))) {
                notExistSubscription = tmp.subscriptionRef.toString();
            }
            for (let k=i+1; k < subscriptions.length && !notUniqueSubscription; k++) {
                notUniqueSubscription = tmp.startDate == subscriptions[k].startDate;
            }
        }
        if (notExistSubscription) {
            return notExistSubscription;
        }
        if (notUniqueSubscription) {
            return false;
        }
        return true;
    }
}