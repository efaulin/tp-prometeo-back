import { Router } from "express";
import { SuscripcionController } from "../controllers/suscripcionController";
import { SuscripcionPrecioController } from "../controllers/suscripcionPrecioController";
import { AuthController } from "../controllers/authController";

export const suscripcionRouter = Router();

suscripcionRouter.route("/")
    .get(SuscripcionController.GetAll)
    .post(AuthController.allowedRoles(["admin"]), SuscripcionController.Create)
;

suscripcionRouter.route("/:id")
    .get(SuscripcionController.GetOne)
    .put(AuthController.allowedRoles(["admin"]), SuscripcionController.Update)
    .delete(AuthController.allowedRoles(["admin"]), SuscripcionController.Delete)
;

suscripcionRouter.route("/:id/prices")
    .get(AuthController.allowedRoles(["admin"]), SuscripcionPrecioController.GetAllOfOne)
    .post(AuthController.allowedRoles(["admin"]), SuscripcionPrecioController.Create)
;