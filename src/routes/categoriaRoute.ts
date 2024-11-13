import { Router } from "express";
import { CategoriaController } from "../controllers/categoriaController";
import { AuthController } from "../controllers/authController";

export const categoriaRouter = Router();

categoriaRouter.route("/")
    //GETALL
    .get(AuthController.allowedRoles(["admin"]), CategoriaController.GetAll)
    //CREATE
    .post(AuthController.allowedRoles(["admin"]), CategoriaController.Create)
;

categoriaRouter.route("/:id")
    .get(AuthController.allowedRoles(["admin", "client"]), CategoriaController.GetOne)
    .put(AuthController.allowedRoles(["admin"]), CategoriaController.Update)
    .delete(AuthController.allowedRoles(["admin"]), CategoriaController.Delete)
;