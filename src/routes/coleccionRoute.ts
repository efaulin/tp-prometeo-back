import { Router } from "express";
import { ColeccionControler } from "../controllers/coleccionController";

//RUTAS /api/Coleccion
export const coleccionRouter = Router();

coleccionRouter.route("/")
    //GETALL
    .get(ColeccionControler.GetAll)
    //CREATE
    .post(ColeccionControler.Create)
;

coleccionRouter.route("/:id")
    .get(ColeccionControler.GetOne)
    .put(ColeccionControler.Update)
    .delete(ColeccionControler.Delete)

