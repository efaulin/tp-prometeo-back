import { Router } from "express";
import { SuscripcionPrecioController } from "../controllers/suscripcionPrecioController";
import { AuthController } from "../controllers/authController";

export const suscripcionPrecioRouter = Router();

suscripcionPrecioRouter.route("/")
    .get(AuthController.allowedRoles(["admin"]), SuscripcionPrecioController.GetAll)
;

suscripcionPrecioRouter.route("/:id")
    .get(SuscripcionPrecioController.GetOne)
    .delete(AuthController.allowedRoles(["admin"]), SuscripcionPrecioController.Delete)
;
