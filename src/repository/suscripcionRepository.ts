import { Suscripcion, SuscripcionModel, SuscripcionPrecio, SuscripcionPrecioModel } from "../schemas/suscripcionSchema.js";
import { HydratedDocument, Document } from "mongoose";
import { SuscripcionPrecioRepository } from "./suscripcionPrecioRepository.js";

export class SuscripcionRepository{

    /**
     * Busca una **Suscripcion** por ID.
     * @param id Atributo id a buscar.
     * @returns En caso de encontrar una **Suscripcion** con el mismo `id` lo devuelve. Caso contrario, devuelve **undefined**.
     * @async
     */
    static async GetOne(id:string): Promise<HydratedDocument<Suscripcion> | null> {
        try {
            const result = await SuscripcionModel.findById(id);
            return result;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    /**
     * Devuelve todas las **Suscripciones**.
     * @returns Colleccion de **Suscripcion**'s. En caso de error, devuelve **undefined**.
     * @async
     */
    static async GetAll(): Promise<Suscripcion[] | undefined>{
        try {
            const suscripciones = await SuscripcionModel.find().exec();
            return suscripciones;
        } catch (error) {
            console.error("Error al obtener las suscripciones:", error);
            return undefined;
        }
    }

    /**
     * Carga una **Suscripcion** a la BBDD.
     * @param subscriptionName Nombre de la **Suscripcion** a subir.
     * @returns En caso de haber cargado, devuelve la **Suscripcion** con `id`. Caso contrario, devuelve **undefined**.
     * @async
     */
    static async Create(subscriptionName:string, subscriptionPrices:Array<Partial<SuscripcionPrecio>>): Promise<HydratedDocument<Suscripcion>|undefined> {
        try {
            const newSubscription = new SuscripcionModel({
                type: subscriptionName,
            });
            await newSubscription.save();
            if (subscriptionPrices) {
                subscriptionPrices.forEach(async onePrice => {
                    await SuscripcionPrecioRepository.Create(onePrice.startDate!, onePrice.amount!, newSubscription);
                })
            }
            return newSubscription;
        } catch (error) {
            console.error("Error al crear la suscripcion:", error);
            return undefined;
        }
    }

    /**
     * Modifica una **Suscripcion** de la BBDD.
     * @param id de la **Suscripcion** a subir.
     * @param updateFields Objeto Partial<Suscripcion> con los valores a modificar.
     * @returns En caso de haber cargado, devuelve la **Suscripcion** con los cambios. Caso contrario, devuelve **null**.
     * @async
     */
    static async Update(id:string, updateFields: Partial<Suscripcion>): Promise<HydratedDocument<Suscripcion>|null> {
        try {
            // Usa findByIdAndUpdate para actualizar solo los campos proporcionados
            const updatedSubscription = await SuscripcionModel.findByIdAndUpdate(id, updateFields, { new: true });
            return updatedSubscription;
        } catch (error) {
            console.error("Error al actualizar la suscripcion en la base de datos:", error);
            return null;
        }
    }

    /**
     * Elimina una **Suscripcion** de la BBDD.
     * @param id de la **Suscripcion** a eliminar.
     * @returns En caso de exito, devuelve la **Suscripcion** eliminada. Caso contrario, devuelve **undefined**.
     * @async
     */
    static async Delete(id:string):Promise<HydratedDocument<Suscripcion> | null> {
        try {
            const result = await SuscripcionModel.findByIdAndDelete(id);
            await SuscripcionPrecioModel.deleteMany({suscripcionId:id});
            return result;
        } catch (error) {
            console.error("Error al eliminar la suscripcion:", error);
            return null;
        }
    }
}