import { Router } from "express";
import { ColeccionControler } from "../controllers/coleccionController.js";
import { HandleResponse } from "./interfaceReturn.js";

//RUTAS /api/Coleccion
export const coleccionRouter = Router();

const handleResponse = new HandleResponse(
    "Colección Actualizada",
    "Colección Borrada",
    "Que pones?????",
    "No se encontro ID",
    "(。_。)"
);

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

