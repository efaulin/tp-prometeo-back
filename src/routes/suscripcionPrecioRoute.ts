import { Router } from "express";
import { SuscripcionPrecioController } from "../controllers/suscripcionPrecioController";

export const suscripcionPrecioRouter = Router();

suscripcionPrecioRouter.route("/")
    .get(SuscripcionPrecioController.GetAll)
;

suscripcionPrecioRouter.route("/:id")
    .get(SuscripcionPrecioController.GetOne)
    .delete(SuscripcionPrecioController.Delete)
;
