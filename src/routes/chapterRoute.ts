import { Router } from "express";
import { ChapterController } from "../controllers/chapterController";
import { ReplayController } from "../controllers/replayController";
import { AuthorController } from "../controllers/authorController";
import { HostController } from "../controllers/hostController";
import { AuthController } from "../controllers/authController";

//RUTAS /api/Chapter
export const chapterRouter = Router();

chapterRouter.route("/")
    //GETALL
    .get(ChapterController.GetAll)
    //CREATE
    .post(AuthController.allowedRoles(["admin"]), ChapterController.Create)
;

chapterRouter.route("/:id")
    .get(ChapterController.GetOne)
    .put(AuthController.allowedRoles(["admin"]), ChapterController.Update)
    .delete(AuthController.allowedRoles(["admin"]), ChapterController.Delete)
;

chapterRouter.route("/:id/replays")
    .get(AuthController.allowedRoles(["admin"]), ReplayController.GetAllOfOne)
;