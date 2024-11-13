import { Router } from "express";
import { TipoUsuarioController } from "../controllers/tipoUsuarioController";

//RUTAS /api/TipoUsuario
export const tipoUsuarioRouter = Router();

tipoUsuarioRouter.route("/")
    //GETALL
    .get(TipoUsuarioController.GetAll)
    //CREATE
    .post(TipoUsuarioController.Create)
;

tipoUsuarioRouter.route("/:id")
    .get(TipoUsuarioController.GetOne)
    .put(TipoUsuarioController.Update)
    .delete(TipoUsuarioController.Delete)

