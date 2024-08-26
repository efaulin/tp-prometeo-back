import { ObjectId } from "mongodb";
import { Categoria } from "../entities/categoriaEntity.js";
import { CategoriaRepository } from "../repository/categoriaRepository.js";
import { Request, Response } from "express";

export class CategoriaController{
    static async GetAll(req: Request, res: Response){
        try {
            const categorias = await CategoriaRepository.GetAll();
            if (categorias) {
                return res.status(200).json(categorias);
            } else {
                //ASK Si repo.GetAll no encuentra nada, ¿No devolveria una colleccion vacia en vez de null? ¿Esta condicion abarca el arreglo vacio?
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
            return res.status(404).send("No se encontró el usuario.");
        } catch (error) {
            console.error("Error al obtener categoria", error)
            return res.status(500).send("Error interno del servidor.");
        }
    }

    static async Create(req: Request, res: Response){
        
    }
}