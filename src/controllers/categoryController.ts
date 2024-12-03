import { CategoryRepository } from "../repository/categoryRepository";
import { Request, Response } from "express";

export class CategoryController{
    static async GetAll(req: Request, res: Response){
        try {
            const categories = await CategoryRepository.GetAll();
            if (categories) {
                return res.status(200).json(categories);
            } else {
                return res.status(404).send("No se encontraron categories.");
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send("[Error] GetAll Categories");
        }
    }

    static async GetOne(req: Request, res: Response){
        const id = req.params.id;
        try {
            const user = await CategoryRepository.GetOne(id);
            if (user) {
                return res.status(200).json(user);
            }
            return res.status(404).send("No se encontró la category.");
        } catch (error) {
            console.error("Error al obtener category", error)
            return res.status(500).send("Error interno del servidor.");
        }
    }

    static async Create(req: Request, res: Response){
        const validateUserInput = (req: Request):boolean => {
            const {name} = req.body;
            return name ? true : false;
        }
        if (!validateUserInput(req)) {
            return res.status(400).send("Datos de entrada invalidos");
        }
        const name = req.body.name;
        try {
            const result = await CategoryRepository.Create(name);
            return res.status(201).json(result);
        } catch (error) {
            console.error("Error al crear category:", error);
            return res.status(500).send("[Error] Create Category");
        }
    }

    static async Update(req: Request, res: Response) {
        const id = req.params.id;
        const { name } = req.body;
        // Crear un objeto con solo los campos que se han proporcionado
        const updateFields: any = {};
        if (name) updateFields.name = name;
        //Se deja de esta manera en caso de agregar mas atributos en el futuro

        try {
            const result = await CategoryRepository.Update(id, updateFields);
            if (result) {
                return res.status(200).json(result);
            }
            return res.status(404).send("No se encontró la category para actualizar.");
        } catch (error) {
            console.error("Error al actualizar category:", error);
            return res.status(500).send("[Error] Update Category");
        }
    }

    static async Delete(req: Request, res: Response){
        try {
            const id = req.params.id;
            const result = await CategoryRepository.Delete(id);
            if (result) {
                return res.status(202).send("Category Borrada");
            }
            return res.status(404).send("No se encontró la category");
        } catch (error) {
            console.error("Error al eliminar category:", error);
            return res.status(500).send("[Error] Delete Category");
        }

    }
}