import { Router } from "express";
import { AutorController } from "../controllers/autorController";

//RUTAS /api/Autor
export const autorRouter = Router();

autorRouter.route("/")
    //GETALL
    .get(AutorController.GetAll)
    //CREATE
    .post(AutorController.Create)
;

autorRouter.route("/:id")
    .get(AutorController.GetOne)
    .put(AutorController.Update)
    .delete(AutorController.Delete)

