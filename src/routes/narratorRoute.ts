import { Router } from "express";
import { NarratorController } from "../controllers/narratorController";

//RUTAS /api/Narrator
export const narratorRouter = Router();

narratorRouter.route("/")
    //GETALL
    .get(NarratorController.GetAll)
    //CREATE
    .post(NarratorController.Create)
;

narratorRouter.route("/:id")
    .get(NarratorController.GetOne)
    .put(NarratorController.Update)
    .delete(NarratorController.Delete)

