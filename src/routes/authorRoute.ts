import { Router } from "express";
import { AuthorController } from "../controllers/authorController";

//RUTAS /api/Author
export const authorRouter = Router();

authorRouter.route("/")
    //GETALL
    .get(AuthorController.GetAll)
    //CREATE
    .post(AuthorController.Create)
;

authorRouter.route("/:id")
    .get(AuthorController.GetOne)
    .put(AuthorController.Update)
    .delete(AuthorController.Delete)

