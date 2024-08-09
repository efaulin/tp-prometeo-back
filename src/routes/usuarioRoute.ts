import { Router } from "express";
import { UsuarioController } from "../controllers/usuarioController.js";

//RUTAS /api/usuario
export const usuarioRouter = Router();

usuarioRouter.route("/")
    //GETALL
    .get(UsuarioController.GetAll)
    //CREATE
    .post(UsuarioController.Create)
;

usuarioRouter.route("/:id")
    .get(UsuarioController.GetOne)
    .put(UsuarioController.Update)
    .delete(UsuarioController.Delete)