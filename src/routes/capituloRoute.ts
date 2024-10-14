import { Router } from "express";
import { CapituloControler } from "../controllers/capituloController";

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

