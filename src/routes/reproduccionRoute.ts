import { Router } from "express";
import { ReproduccionController } from "../controllers/reproduccionController";

//RUTAS /api/Reproduccion
export const reproduccionRouter = Router();

reproduccionRouter.route("/")
    //GETALL
    .get(ReproduccionController.GetAll)
    //CREATE
    .post(ReproduccionController.Create)
;

reproduccionRouter.route("/:id")
    .get(ReproduccionController.GetOne)
    .put(ReproduccionController.Update)
    .delete(ReproduccionController.Delete)

