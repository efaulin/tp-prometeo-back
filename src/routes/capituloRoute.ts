import { Router } from "express";
import { CapituloControler } from "../controllers/capituloController";
import { ReproduccionControler } from "../controllers/reproduccionController.js";

//RUTAS /api/Capitulo
export const capituloRouter = Router();

capituloRouter.route("/")
    //GETALL
    .get(CapituloControler.GetAll)
    //CREATE
    .post(CapituloControler.Create)
;

capituloRouter.route("/:id")
    .get(CapituloControler.GetOne)
    .put(CapituloControler.Update)
    .delete(CapituloControler.Delete)
;
//TODO Testear
capituloRouter.route("/:id/replays")
    .get(ReproduccionControler.GetAllOfOne)
;
