import { Router } from "express";
import { CapituloController } from "../controllers/capituloController";
import { ReproduccionController } from "../controllers/reproduccionController";
import { AutorController } from "../controllers/autorController";
import { ConductorController } from "../controllers/conductorController";
import { AuthController } from "../controllers/authController";

//RUTAS /api/Capitulo
export const capituloRouter = Router();

capituloRouter.route("/")
    //GETALL
    .get(CapituloController.GetAll)
    //CREATE
    .post(AuthController.allowedRoles(["admin"]), CapituloController.Create)
;

capituloRouter.route("/:id")
    .get(CapituloController.GetOne)
    .put(AuthController.allowedRoles(["admin"]), CapituloController.Update)
    .delete(AuthController.allowedRoles(["admin"]), CapituloController.Delete)
;

capituloRouter.route("/:id/replays")
    .get(AuthController.allowedRoles(["admin"]), ReproduccionController.GetAllOfOne)
;