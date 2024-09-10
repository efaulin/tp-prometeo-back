import { Router } from "express";
import { SuscripcionController } from "../controllers/suscripcionController.js";

export const suscripcionPrecioRouter = Router();

suscripcionPrecioRouter.route("/")
    .get(SuscripcionController.GetAll)
    .post(SuscripcionController.Create)
;

suscripcionPrecioRouter.route("/:id")
    .get(SuscripcionController.GetOne)
    .put(SuscripcionController.Update)
    .delete(SuscripcionController.Delete)
;