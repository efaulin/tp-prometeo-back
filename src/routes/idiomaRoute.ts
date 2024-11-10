import { Router } from "express";
import { IdiomaController } from "../controllers/idiomaController";

//RUTAS /api/Idioma
export const idiomaRouter = Router();

idiomaRouter.route("/")
    //GETALL
    .get(IdiomaController.GetAll)
    //CREATE
    .post(IdiomaController.Create)
;

idiomaRouter.route("/:id")
    .get(IdiomaController.GetOne)
    .put(IdiomaController.Update)
    .delete(IdiomaController.Delete)

