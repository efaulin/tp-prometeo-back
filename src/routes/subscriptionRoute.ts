import { Router } from "express";
import { SuscripcionController } from "../controllers/subscriptionController";
import { SubscriptionPriceController } from "../controllers/subscriptionPriceController";
import { AuthController } from "../controllers/authController";

export const subscriptionRouter = Router();

subscriptionRouter.route("/")
    .get(SuscripcionController.GetAll)
    .post(AuthController.allowedRoles(["admin"]), SuscripcionController.Create)
;

subscriptionRouter.route("/:id")
    .get(SuscripcionController.GetOne)
    .put(AuthController.allowedRoles(["admin"]), SuscripcionController.Update)
    .delete(AuthController.allowedRoles(["admin"]), SuscripcionController.Delete)
;

subscriptionRouter.route("/:id/prices")
    .get(AuthController.allowedRoles(["admin"]), SubscriptionPriceController.GetAllOfOne)
    .post(AuthController.allowedRoles(["admin"]), SubscriptionPriceController.Create)
;