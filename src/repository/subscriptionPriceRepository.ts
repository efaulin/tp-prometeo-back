import { Subscription, SuscripcionModel, SubscriptionPrice, SubscriptionPriceModel } from "../schemas/subscriptionSchema";
import { HydratedDocument, Document } from "mongoose";

export class SubscriptionPriceRepository{

    /**
     * Busca una **SubscriptionPrice** por ID.
     * @param id Atributo id a buscar.
     * @returns En caso de encontrar una **SubscriptionPrice** con el mismo `id` lo devuelve. Caso contrario, devuelve **undefined**.
     * @async
     */
    static async GetOne(id:string): Promise<HydratedDocument<SubscriptionPrice> | null> {
        try {
            const result = await SubscriptionPriceModel.findById(id);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    /**
     * Devuelve todas las **SubscriptionPrice** de la BBDD.
     * @returns Colleccion de **SubscriptionPrice**'s. En caso de error, devuelve **undefined**.
     * @async
     */
    static async GetAll(): Promise<SubscriptionPrice[] | undefined>{
        try {
            const subscriptions = await SubscriptionPriceModel.find().exec();
            return subscriptions;
        } catch (error) {
            console.error("Error al obtener las subscriptionsPrecio:", error);
            throw error;
        }
    }

    /**
     * Devuelve todas las **SubscriptionPrice** de la BBDD.
     * @returns Colleccion de **SubscriptionPrice**'s. En caso de error, devuelve **undefined**.
     * @async
     */
    static async GetAllOfOne(subscriptionid : string): Promise<SubscriptionPrice[] | undefined>{
        try {
            const subscriptions = await SubscriptionPriceModel.find({subscriptionId:subscriptionid}).exec();
            return subscriptions;
        } catch (error) {
            console.error("Error al obtener las subscriptionsPrecio:", error);
            throw error;
        }
    }

    /**
     * Carga una **SubscriptionPrice** a la BBDD.
     * @param startdate Fecha desde que entra en vigor el nuevo precio.
     * @param amount Monto del precio.
     * @param subscription Objeto **Subscription** del precio a guardar.
     * @returns En caso de haber cargado, devuelve la **SubscriptionPrice** con `id`, y asigna lo asigna al array de prices de su **Subscription**. Caso contrario, devuelve **undefined**.
     * @async
     */
    static async Create(startdate:Date, amount:Number, subscription:HydratedDocument<Subscription>): Promise<HydratedDocument<SubscriptionPrice>|undefined> {
        try {
            const newSubscriptionPrice = new SubscriptionPriceModel({
                startDate: startdate,
                amount: amount,
                subscriptionId: subscription._id
            });
            await newSubscriptionPrice.save();
            return newSubscriptionPrice;
        } catch (error) {
            console.error("Error al crear la subscriptionPrice:", error);
            throw error;
        }
    }

    /**
     * Elimina una **SubscriptionPrice** de la BBDD.
     * @param id de la **SubscriptionPrice** a eliminar.
     * @returns En caso de exito, devuelve la **SubscriptionPrice** eliminada. Caso contrario, devuelve **undefined**.
     * @async
     */
    static async Delete(id:string):Promise<HydratedDocument<SubscriptionPrice> | null> {
        try {
            const result = await SubscriptionPriceModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Error al eliminar la subscriptionPrice:", error);
            throw error;
        }
    }
}