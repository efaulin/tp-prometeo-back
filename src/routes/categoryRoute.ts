import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";
import { AuthController } from "../controllers/authController";

export const categoryRouter = Router();

categoryRouter.route("/")
    //GETALL
    .get(AuthController.allowedRoles(["admin"]), CategoryController.GetAll)
    //CREATE
    .post(AuthController.allowedRoles(["admin"]), CategoryController.Create)
;

categoryRouter.route("/:id")
    .get(AuthController.allowedRoles(["admin", "client"]), CategoryController.GetOne)
    .put(AuthController.allowedRoles(["admin"]), CategoryController.Update)
    .delete(AuthController.allowedRoles(["admin"]), CategoryController.Delete)
;