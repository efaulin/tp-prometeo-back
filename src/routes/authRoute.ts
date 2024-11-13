import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { UsuarioController } from "../controllers/usuarioController";

//RUTAS /api/Auth
export const authRouter = Router();

authRouter.route("/login")
    //Inicio de sesion
    .post(AuthController.Login)
;

authRouter.route("/refresh")
    //Recarga de token
    .post(AuthController.TokenRefresh)
;

authRouter.route("/signup")
    //Registro de usuario
    .post(UsuarioController.Create)
;

authRouter.route("/logout")
    //Cierre de sesion
    .post(AuthController.Logout);
;
