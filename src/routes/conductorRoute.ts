import { Router } from "express";
import { ConductorController } from "../controllers/conductorController";

//RUTAS /api/Conductor
export const conductorRouter = Router();

conductorRouter.route("/")
    //GETALL
    .get(ConductorController.GetAll)
    //CREATE
    .post(ConductorController.Create)
;

conductorRouter.route("/:id")
    .get(ConductorController.GetOne)
    .put(ConductorController.Update)
    .delete(ConductorController.Delete)

