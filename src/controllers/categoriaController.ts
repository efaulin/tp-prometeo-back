import { CategoriaRepository } from "../repository/categoriaRepository";
import { Request, Response } from "express";

export class CategoriaController{
    static async GetAll(req: Request, res: Response){
        try {
            const categorias = await CategoriaRepository.GetAll();
            if (categorias) {
                return res.status(200).json(categorias);
            } else {
                return res.status(404).send("No se encontraron categorias.");
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send("[Error] GetAll Categories");
        }
    }

    static async GetOne(req: Request, res: Response){
        const id = req.params.id;
        try {
            const user = await CategoriaRepository.GetOne(id);
            if (user) {
                return res.status(200).json(user);
            }
            return res.status(404).send("No se encontró la categoria.");
        } catch (error) {
            console.error("Error al obtener categoria", error)
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
            const result = await CategoriaRepository.Create(name);
            return res.status(201).json(result);
        } catch (error) {
            console.error("Error al crear categoria:", error);
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
            const result = await CategoriaRepository.Update(id, updateFields);
            if (result) {
                return res.status(200).json(result);
            }
            return res.status(404).send("No se encontró la categoria para actualizar.");
        } catch (error) {
            console.error("Error al actualizar categoria:", error);
            return res.status(500).send("[Error] Update Category");
        }
    }

    static async Delete(req: Request, res: Response){
        try {
            const id = req.params.id;
            const result = await CategoriaRepository.Delete(id);
            if (result) {
                return res.status(202).send("Categoria Borrada");
            }
            return res.status(404).send("No se encontró la categoria");
        } catch (error) {
            console.error("Error al eliminar categoria:", error);
            return res.status(500).send("[Error] Delete Category");
        }

    }
}