import { Suscripcion, SuscripcionModel, SuscripcionPrecio, SuscripcionPrecioModel } from "../schemas/suscripcionSchema.js";
import { HydratedDocument, Document } from "mongoose";

//ASK ¿Como popular los precios? Se me ocurre que podemos devolver siempre las suscripciones con el ultimo precio del arreglo "populado" por defecto, y opcionalmente con todos, o permitimos un metodo para recuperar un precio por id
export class SuscripcionPrecioRepository{

    /**
     * Busca una **SuscripcionPrecio** por ID.
     * @param id Atributo id a buscar.
     * @returns En caso de encontrar una **SuscripcionPrecio** con el mismo `id` lo devuelve. Caso contrario, devuelve **undefined**.
     * @async
     */
    static async GetOne(id:string): Promise<HydratedDocument<SuscripcionPrecio> | null> {
        try {
            const result = await SuscripcionPrecioModel.findById(id);
            return result;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    /**
     * Devuelve todas las **SuscripcionPrecio** de la BBDD.
     * @returns Colleccion de **SuscripcionPrecio**'s. En caso de error, devuelve **undefined**.
     * @async
     */
    static async GetAll(): Promise<SuscripcionPrecio[] | undefined>{
        try {
            const suscripciones = await SuscripcionPrecioModel.find().exec();
            return suscripciones;
        } catch (error) {
            console.error("Error al obtener las suscripcionesPrecio:", error);
            return undefined;
        }
    }

    /**
     * Carga una **SuscripcionPrecio** a la BBDD.
     * @param startdate Fecha desde que entra en vigor el nuevo precio.
     * @param amount Monto del precio.
     * @param suscripcion Objeto **Suscripcion** del precio a guardar.
     * @returns En caso de haber cargado, devuelve la **SuscripcionPrecio** con `id`, y asigna lo asigna al array de prices de su **Suscripcion**. Caso contrario, devuelve **undefined**.
     * @async
     */
    static async Create(startdate:Date, amount:number, suscripcion:HydratedDocument<Suscripcion>): Promise<HydratedDocument<SuscripcionPrecio>|undefined> {
        try {
            const newSubscriptionPrice = new SuscripcionPrecioModel({
                startDate: startdate,
                amount: amount,
                suscripcionId: suscripcion._id.toString()
            });
            suscripcion.prices?.push(newSubscriptionPrice);
            await newSubscriptionPrice.save();
            await suscripcion.save();
            return newSubscriptionPrice;
        } catch (error) {
            console.error("Error al crear la suscripcionPrecio:", error);
            return undefined;
        }
    }

    /**
     * Elimina una **SuscripcionPrecio** de la BBDD.
     * @param id de la **SuscripcionPrecio** a eliminar.
     * @returns En caso de exito, devuelve la **SuscripcionPrecio** eliminada. Caso contrario, devuelve **undefined**.
     * @async
     */
    static async Delete(id:string):Promise<HydratedDocument<SuscripcionPrecio> | null> {
        try {
            const result = await SuscripcionPrecioModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Error al eliminar la suscripcionPrecio:", error);
            return null;
        }
    }
}