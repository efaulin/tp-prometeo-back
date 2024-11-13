import { Router } from "express";
import { UsuarioController } from "../controllers/usuarioController";
import { ReproduccionController } from "../controllers/reproduccionController";
import { AuthController } from "../controllers/authController";

//RUTAS /api/usuario
export const usuarioRouter = Router();

usuarioRouter.route("/")
    //GETALL
    .get(AuthController.allowedRoles(["admin"]), UsuarioController.GetAll)
    //CREATE
    .post(AuthController.allowedRoles(["admin"]), UsuarioController.Create)
;

usuarioRouter.route("/:id")
    .get(AuthController.allowedRoles(["admin"]), UsuarioController.GetOne)
    .put(AuthController.allowedRolesAndOwner(["admin"]), UsuarioController.Update)
    .delete(AuthController.allowedRoles(["admin"]), UsuarioController.Delete)
;
//TODO Testear esto en los test de Repoducciones
usuarioRouter.route("/:id/replays")
    .get(AuthController.allowedRolesAndOwner(["admin"]), ReproduccionController.GetAllOfOne)
;