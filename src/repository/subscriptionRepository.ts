import { Subscription, SubscriptionModel, SubscriptionPrice, SubscriptionPriceModel } from "../schemas/subscriptionSchema";
import { HydratedDocument, Document } from "mongoose";
import { SubscriptionPriceRepository } from "./subscriptionPriceRepository";

export class SubscriptionRepository{

    /**
     * Busca una **Subscription** por ID.
     * @param id Atributo id a buscar.
     * @returns En caso de encontrar una **Subscription** con el mismo `id` lo devuelve. Caso contrario, devuelve **undefined**.
     * @async
     */
    static async GetOne(id:string): Promise<HydratedDocument<Subscription> | null> {
        try {
            const result = await SubscriptionModel.findById(id);
            return result;
        } catch (error) {
            console.error("Error al consultar la subscription: ",error);
            throw error;
        }
    }

    /**
     * Devuelve todas las **Subscriptions**.
     * @returns Colleccion de **Subscription**'s. En caso de error, devuelve **undefined**.
     * @async
     */
    static async GetAll(): Promise<Subscription[] | undefined>{
        try {
            const subscriptions = await SubscriptionModel.find().exec();
            return subscriptions;
        } catch (error) {
            console.error("Error al obtener las subscriptions:", error);
            throw error;
        }
    }

    /**
     * Carga una **Subscription** a la BBDD.
     * @param subscriptionName Nombre de la **Subscription** a subir.
     * @returns En caso de haber cargado, devuelve la **Subscription** con `id`. Caso contrario, devuelve **undefined**.
     * @async
     */
    static async Create(subscriptionName:string, subscriptionPrices:Array<Partial<SubscriptionPrice>>): Promise<HydratedDocument<Subscription>|undefined> {
        try {
            const newSubscription = new SubscriptionModel({
                type: subscriptionName,
            });
            await newSubscription.save();
            if (subscriptionPrices) {
                for (let i=0; i < subscriptionPrices.length; i++) {
                    await SubscriptionPriceRepository.Create(subscriptionPrices[i].startDate!, subscriptionPrices[i].amount!, newSubscription);
                }
            }
            return newSubscription;
        } catch (error) {
            console.error("Error al crear la subscription:", error);
            throw error;
        }
    }

    /**
     * Modifica una **Subscription** de la BBDD.
     * @param id de la **Subscription** a subir.
     * @param updateFields Objeto Partial<Subscription> con los valores a modificar.
     * @returns En caso de haber cargado, devuelve la **Subscription** con los cambios. Caso contrario, devuelve **null**.
     * @async
     */
    static async Update(id:string, updateFields: Partial<Subscription>): Promise<HydratedDocument<Subscription>|null> {
        try {
            // Usa findByIdAndUpdate para actualizar solo los campos proporcionados
            const updatedSubscription = await SubscriptionModel.findByIdAndUpdate(id, updateFields, { new: true });
            return updatedSubscription;
        } catch (error) {
            console.error("Error al actualizar la subscription en la base de datos:", error);
            throw error;
        }
    }

    /**
     * Elimina una **Subscription** de la BBDD.
     * @param id de la **Subscription** a eliminar.
     * @returns En caso de exito, devuelve la **Subscription** eliminada. Caso contrario, devuelve **undefined**.
     * @async
     */
    static async Delete(id:string):Promise<HydratedDocument<Subscription> | null> {
        try {
            const result = await SubscriptionModel.findByIdAndDelete(id);
            await SubscriptionPriceModel.deleteMany({subscriptionRef:id});
            return result;
        } catch (error) {
            console.error("Error al eliminar la subscription:", error);
            throw error;
        }
    }
}