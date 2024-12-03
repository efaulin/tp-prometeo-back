import { Router } from "express";
import { HostController } from "../controllers/hostController";

//RUTAS /api/Host
export const hostRouter = Router();

hostRouter.route("/")
    //GETALL
    .get(HostController.GetAll)
    //CREATE
    .post(HostController.Create)
;

hostRouter.route("/:id")
    .get(HostController.GetOne)
    .put(HostController.Update)
    .delete(HostController.Delete)

