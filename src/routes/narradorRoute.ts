import { Router } from "express";
import { NarradorController } from "../controllers/narradorController";

//RUTAS /api/Narrador
export const narradorRouter = Router();

narradorRouter.route("/")
    //GETALL
    .get(NarradorController.GetAll)
    //CREATE
    .post(NarradorController.Create)
;

narradorRouter.route("/:id")
    .get(NarradorController.GetOne)
    .put(NarradorController.Update)
    .delete(NarradorController.Delete)

