import { Router } from "express";
import { CapituloController } from "../controllers/capituloController";
import { ReproduccionController } from "../controllers/reproduccionController";
import { AutorController } from "../controllers/autorController";
import { ConductorController } from "../controllers/conductorController";

//RUTAS /api/Capitulo
export const capituloRouter = Router();

capituloRouter.route("/")
    //GETALL
    .get(CapituloController.GetAll)
    //CREATE
    .post(CapituloController.Create)
;

capituloRouter.route("/:id")
    .get(CapituloController.GetOne)
    .put(CapituloController.Update)
    .delete(CapituloController.Delete)
;

capituloRouter.route("/:id/replays")
    .get(ReproduccionController.GetAllOfOne)
;