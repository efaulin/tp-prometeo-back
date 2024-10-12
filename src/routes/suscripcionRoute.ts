import { Router } from "express";
import { SuscripcionController } from "../controllers/suscripcionController.js";

export const suscripcionRouter = Router();

suscripcionRouter.route("/")
    .get(SuscripcionController.GetAll)
    .post(SuscripcionController.Create)
;

suscripcionRouter.route("/:id")
    .get(SuscripcionController.GetOne)
    .put(SuscripcionController.Update)
    .delete(SuscripcionController.Delete)
;