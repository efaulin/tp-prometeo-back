import { Router } from "express";
import { ColeccionController } from "../controllers/coleccionController";
import { AuthController } from "../controllers/authController";

//RUTAS /api/Coleccion
export const coleccionRouter = Router();

coleccionRouter.route("/")
    //GETALL
    .get(ColeccionController.GetAll)
    //CREATE
    .post(AuthController.allowedRoles(["admin"]), ColeccionController.Create)
;

coleccionRouter.route("/:id")
    .get(ColeccionController.GetOne)
    .put(AuthController.allowedRoles(["admin"]), ColeccionController.Update)
    .delete(AuthController.allowedRoles(["admin"]), ColeccionController.Delete)

