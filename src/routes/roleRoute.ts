import { Router } from "express";
import { RoleController } from "../controllers/roleController";

//RUTAS /api/Role
export const roleRouter = Router();

roleRouter.route("/")
    //GETALL
    .get(RoleController.GetAll)
    //CREATE
    .post(RoleController.Create)
;

roleRouter.route("/:id")
    .get(RoleController.GetOne)
    .put(RoleController.Update)
    .delete(RoleController.Delete)

