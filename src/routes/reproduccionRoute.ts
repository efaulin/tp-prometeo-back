import { Router } from "express";
import { ReproduccionControler } from "../controllers/reproduccionController";

//RUTAS /api/Reproduccion
export const reproduccionRouter = Router();

reproduccionRouter.route("/")
    //GETALL
    .get(ReproduccionControler.GetAll)
    //CREATE
    .post(ReproduccionControler.Create)
;
//TODO GetOneOf
reproduccionRouter.route("/:id")
    .get(ReproduccionControler.GetOne)
    .put(ReproduccionControler.Update)
    .delete(ReproduccionControler.Delete)

