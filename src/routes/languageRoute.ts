import { Router } from "express";
import { LanguageController } from "../controllers/languageController";

//RUTAS /api/Language
export const languageRouter = Router();

languageRouter.route("/")
    //GETALL
    .get(LanguageController.GetAll)
    //CREATE
    .post(LanguageController.Create)
;

languageRouter.route("/:id")
    .get(LanguageController.GetOne)
    .put(LanguageController.Update)
    .delete(LanguageController.Delete)

