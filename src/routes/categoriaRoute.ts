import { Router } from "express";
import { CategoriaController } from "../controllers/categoriaController.js";

export const categoriaRouter = Router();

categoriaRouter.route("/")
    //GETALL
    .get(CategoriaController.GetAll)
    //CREATE
    .post(CategoriaController.Create)
;

categoriaRouter.route("/:id")
    .get(CategoriaController.GetOne)
    .put(CategoriaController.Update)
    .delete(CategoriaController.Delete)
;