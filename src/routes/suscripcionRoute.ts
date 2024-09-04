import { Router } from "express";
import { SuscripcionController } from "../controllers/suscripcionController.js";

export const suscripcionRouter = Router();

suscripcionRouter.route("/")
    //GETALL
    .get(SuscripcionController.GetAll)
    //CREATE
    .post(SuscripcionController.Create)
;

suscripcionRouter.route("/:id")
    .get(SuscripcionController.GetOne)
    .put(SuscripcionController.Update)
    .delete(SuscripcionController.Delete)
;