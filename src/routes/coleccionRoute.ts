import { Router } from "express";
import { ColeccionController } from "../controllers/coleccionController";

//RUTAS /api/Coleccion
export const coleccionRouter = Router();

coleccionRouter.route("/")
    //GETALL
    .get(ColeccionController.GetAll)
    //CREATE
    .post(ColeccionController.Create)
;

coleccionRouter.route("/:id")
    .get(ColeccionController.GetOne)
    .put(ColeccionController.Update)
    .delete(ColeccionController.Delete)

