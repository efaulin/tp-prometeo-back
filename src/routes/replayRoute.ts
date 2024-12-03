import { Router } from "express";
import { ReplayController } from "../controllers/replayController";

//RUTAS /api/Replay
export const replayRouter = Router();

replayRouter.route("/")
    //GETALL
    .get(ReplayController.GetAll)
    //CREATE
    .post(ReplayController.Create)
;

replayRouter.route("/:id")
    .get(ReplayController.GetOne)
    .put(ReplayController.Update)
    .delete(ReplayController.Delete)

