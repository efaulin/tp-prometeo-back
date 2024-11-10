import { Router } from "express";
import { CapituloController } from "../controllers/capituloController";
import { ReproduccionController } from "../controllers/reproduccionController";

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

capituloRouter.route("/:id/authors")
    .get() //TODO Traer coleccion de autores del capitulo
;

capituloRouter.route("/:id/hosts")
    .get() //TODO Traer coleccion de conductores del capitulo
;