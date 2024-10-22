import { Router } from "express";
import { SuscripcionController } from "../controllers/suscripcionController";
import { SuscripcionPrecioController } from "../controllers/suscripcionPrecioController.js";

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

suscripcionRouter.route("/:id/prices")
    .get(SuscripcionPrecioController.GetAllOfOne)
    .post(SuscripcionPrecioController.Create)
;