import { Router } from "express";
import { UsuarioController } from "../controllers/usuarioController.js";
import { HandleResponse } from "./interfaceReturn.js";

//RUTAS /api/usuario
export const usuarioRouter = Router();

const handleResponse = new HandleResponse(
    "Usuario Actualizado",
    "Usuario Borrado",
    "Que pones?????",
    "No se encontro ID",
    "(。_。)"
);

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

