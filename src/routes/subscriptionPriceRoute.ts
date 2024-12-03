import { Router } from "express";
import { SubscriptionPriceController } from "../controllers/subscriptionPriceController";
import { AuthController } from "../controllers/authController";

export const subscriptionPriceRouter = Router();

subscriptionPriceRouter.route("/")
    .get(AuthController.allowedRoles(["admin"]), SubscriptionPriceController.GetAll)
;

subscriptionPriceRouter.route("/:id")
    .get(SubscriptionPriceController.GetOne)
    .delete(AuthController.allowedRoles(["admin"]), SubscriptionPriceController.Delete)
;
