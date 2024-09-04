import { Suscripcion } from "../schemas/suscripcionSchema.js";
import { HydratedDocument, Document } from "mongoose";

interface SuscripcionPrecioDocument extends Document{
    startDate: Date;
    amount: Number;
};

interface SuscripcionDocument extends Document{
    type: string;
    prices: SuscripcionPrecioDocument[];
};

export class SuscripcionRepository{

    /**
     * Busca una **Suscripcion** por ID.
     * @param id Atributo id a buscar.
     * @returns En caso de encontrar una **Suscripcion** con el mismo `id` lo devuelve. Caso contrario, devuelve **undefined**.
     * @async
     */
    static async GetOne(id:string): Promise<HydratedDocument<SuscripcionDocument> | null> {
        try {
            const result = await Suscripcion.findById(id);
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
    static async GetAll(): Promise<SuscripcionDocument[] | undefined>{
        try {
            const suscripciones = await Suscripcion.find().exec();
            return suscripciones;
        } catch (error) {
            console.error("Error al obtener las suscripciones:", error);
            return undefined;
        }
    }

    /**
     * Carga una **Suscripcion** a la BBDD.
     * @param categoryName Nombre de la **Suscripcion** a subir.
     * @returns En caso de haber cargado, devuelve la **Suscripcion** con `id`. Caso contrario, devuelve **undefined**.
     * @async
     */
    static async Create(categoryName:string): Promise<HydratedDocument<SuscripcionDocument>|undefined> {
        try {
            const newCategory = new Suscripcion({
                name: categoryName
            });
            const result = await newCategory.save();
            return result;
        } catch (error) {
            console.error("Error al crear la suscripcion:", error);
            return undefined;
        }
    }

    /**
     * Modifica una **Suscripcion** de la BBDD.
     * @param id de la **Suscripcion** a subir.
     * @param updateFields Objeto Partial<SuscripcionDocument> con los valores a modificar.
     * @returns En caso de haber cargado, devuelve la **Suscripcion** con los cambios. Caso contrario, devuelve **null**.
     * @async
     */
    static async Update(id:string, updateFields: Partial<SuscripcionDocument>): Promise<HydratedDocument<SuscripcionDocument>|null> {
        try {
            // Usa findByIdAndUpdate para actualizar solo los campos proporcionados
            const updatedCategory = await Suscripcion.findByIdAndUpdate(id, updateFields, { new: true });
            return updatedCategory;
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
    static async Delete(id:string):Promise<HydratedDocument<SuscripcionDocument> | null> {
        try {
            const result = await Suscripcion.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Error al eliminar la suscripcion:", error);
            return null;
        }
    }
}