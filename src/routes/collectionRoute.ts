import { Router } from "express";
import { CollectionController } from "../controllers/collectionController";
import { AuthController } from "../controllers/authController";

//RUTAS /api/Collection
export const collectionRouter = Router();

collectionRouter.route("/")
    //GETALL
    .get(CollectionController.GetAll)
    //CREATE
    .post(AuthController.allowedRoles(["admin"]), CollectionController.Create)
;

collectionRouter.route("/:id")
    .get(CollectionController.GetOne)
    .put(AuthController.allowedRoles(["admin"]), CollectionController.Update)
    .delete(AuthController.allowedRoles(["admin"]), CollectionController.Delete)

