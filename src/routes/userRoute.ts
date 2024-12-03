import { Router } from "express";
import { UserController } from "../controllers/userController";
import { ReplayController } from "../controllers/replayController";
import { AuthController } from "../controllers/authController";

//RUTAS /api/user
export const userRouter = Router();

userRouter.route("/")
    //GETALL
    .get(AuthController.allowedRoles(["admin"]), UserController.GetAll)
    //CREATE
    .post(AuthController.allowedRoles(["admin"]), UserController.Create)
;

userRouter.route("/:id")
    .get(AuthController.allowedRoles(["admin"]), UserController.GetOne)
    .put(AuthController.allowedRolesAndOwner(["admin"]), UserController.Update)
    .delete(AuthController.allowedRoles(["admin"]), UserController.Delete)
;
//TODO Testear esto en los test de Repoducciones
userRouter.route("/:id/replays")
    .get(AuthController.allowedRolesAndOwner(["admin"]), ReplayController.GetAllOfOne)
;