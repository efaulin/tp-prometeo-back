import { Router } from "express";
import { SubscriptionController } from "../controllers/subscriptionController";
import { SubscriptionPriceController } from "../controllers/subscriptionPriceController";
import { AuthController } from "../controllers/authController";

export const subscriptionRouter = Router();

subscriptionRouter.route("/")
    .get(SubscriptionController.GetAll)
    .post(AuthController.allowedRoles(["admin"]), SubscriptionController.Create)
;

subscriptionRouter.route("/:id")
    .get(SubscriptionController.GetOne)
    .put(AuthController.allowedRoles(["admin"]), SubscriptionController.Update)
    .delete(AuthController.allowedRoles(["admin"]), SubscriptionController.Delete)
;

subscriptionRouter.route("/:id/prices")
    .get(AuthController.allowedRoles(["admin"]), SubscriptionPriceController.GetAllOfOne)
    .post(AuthController.allowedRoles(["admin"]), SubscriptionPriceController.Create)
;