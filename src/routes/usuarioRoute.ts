import { Router } from "express";
import { UsuarioController } from "../controllers/usuarioController";
import { ReproduccionController } from "../controllers/reproduccionController";

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
;
//TODO Testear esto en los test de Repoducciones
usuarioRouter.route("/:id/replays")
    .get(ReproduccionController.GetAllOfOne)
;