import { Request, Response } from "express";
import { UsuarioRepository } from "../repository/usuarioRepository";
import bcrypt from 'bcrypt';
import { authenticateToken, generateAccessToken } from "../tokenMiddleware.js";
import { TipoUsuario } from "../schemas/usuarioSchema.js";

export class AuthController {
    static async Login(req: Request, res: Response) {
        const { username, password } = req.body;
        //Busco usuario en la base de datos
        const user = await UsuarioRepository.GetOneByUsername(username);
        if (!user) {
            return res.status(401).send('Credenciales incorrectas.');
        }
        //Valido contraseña
        const isPasswordValid = bcrypt.compare(password, user!.password);
        if (!isPasswordValid) {
            return res.status(401).send('Credenciales incorrectas.');
        }
        //Envio el token
        const token = generateAccessToken({userId: user._id.toString(), role: (user.role as TipoUsuario).name});
        return res.status(200).json(token);
    }

    static TokenRefresh(req: Request, res: Response) {
        //Con el token anterior, el usuario puede solicitar otro
        authenticateToken(req, res, function() {
            const token = generateAccessToken({userId: req.user!.userId, role: req.user!.role});
            return res.status(200).json(token);
        });
    }

    static Logout(req: Request, res: Response) {
        //ASK ¿Invalidar tokens?
    }
}