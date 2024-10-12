import { ColeccionRepository } from "../repository/coleccionRepository.js";
import { Request, Response } from 'express';
import { Coleccion } from "../schemas/coleccionSchema.js";

export class ColeccionControler{
    static async GetAll(req: Request, res: Response){
        try {
            const colecciones = await ColeccionRepository.GetAll();
            if (colecciones) {
                return res.status(200).json(colecciones);
            } else {
                return res.status(404).send("No se encontraron colecciones.");
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send("[Error] GetAll Cols");
        }
    }
    static async GetOne(req: Request, res: Response){
        const id = req.params.id;
        try {
            const Col = await ColeccionRepository.GetOne(id);
            if (Col) {
                return res.status(200).json(Col);
            }
            return res.status(404).send("No se encontró la colección.");
        } catch (error) {
            console.error("Error al obtener colección:", error);
            return res.status(500).send("Error interno del servidor.");
        }
    }

    static async Create(req: Request, res: Response){
        // Método para validar los datos de entrada
        const validateColInput = (req: Request): boolean => {
            const { name } = req.body;
            return name ? true : false;
        };
        if (!validateColInput(req)) {
            return res.status(400).send("Datos de entrada inválidos.");
        }
        const { name } = req.body;
        try {
            const result = await ColeccionRepository.Create(name);
            return res.status(201).json(result);
        } catch (error) {
            console.error("Error al crear colección:", error);
            return res.status(500).send("[Error] Create Col");
        }
    }

    static async Update(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const { name, categories } = req.body;
        
        // Crear un objeto con solo los campos que se han proporcionado
        const updateFields: any = {};
        if (name) updateFields.name = name;
        if (categories) updateFields.categories = categories;

        try {
            const result = await ColeccionRepository.Update(id, updateFields);
            if (result) {
                return res.status(200).json(result);
            }
            return res.status(404).send("No se encontró la colección para actualizar.");
        } catch (error) {
            console.error("Error al actualizar colección:", error);
            return res.status(500).send("[Error] Update Col");
        }
    }

    static async Delete(req: Request, res: Response){
        try {
            const id = req.params.id;
            const result = await ColeccionRepository.Delete(id);
            if (result) {
                return res.status(202).send("Colección Borrada");
            }
            return res.status(404).send("No se encontró la colección");
        } catch (error) {
            console.error("Error al eliminar la colección:", error);
            return res.status(500).send("[Error] Delete Col");
        }

    }

    //TODO Ver "Sanitizacion de input", mientras queda temporalmente
    /**
     * Funcion para verificar las entradas para un objeto Coleccion
     * @param req Objeto **Request**
     * @returns Si pasa la verificacion devuelve **TRUE**, en caso de algun error **FALSE**.
     */
    static Inputs(req:Request){
        const {name} = req.body;

        if (!name) {
            return false;
        } else {
            return true;
        }
    }
}