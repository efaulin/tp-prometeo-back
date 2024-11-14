import { Request, Response, NextFunction } from "express";
import { UsuarioRepository } from "../repository/usuarioRepository";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { TipoUsuario } from "../schemas/usuarioSchema";

export interface Payload {
    userId: string;
    role: string;
}

export class AuthController {
    static generateAccessToken(payload:Payload) {
        return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_TIMER });
    }

    static allowedRoles(rolesNames:string[]) {
        return function(req:Request, res:Response, next:NextFunction) {
            const user : Payload = req.user!;
            const isAllowed = rolesNames.includes(user.role);

            if (isAllowed) return next();

            return res.status(403).send("Rol no autorizado");
        }
    }

    static allowedRolesAndOwner(rolesNames:string[]) {
        return function(req:Request, res:Response, next:NextFunction) {
            const user : Payload = req.user!;
            const isAllowed = rolesNames.includes(user.role);

            if (isAllowed || user.userId == req.params.id) return next();

            return res.status(403).send("Rol no autorizado");
        }
    }

    static authenticateToken(req:Request, res:Response, next:NextFunction) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
    
        if (token == null) return res.status(401).send("Token no ingresado");
    
        try {
            const payload = jwt.verify(token, process.env.TOKEN_SECRET) as Payload;
            if (!payload) {
                return res.status(401).send("Token no valido");
            }
            req.user = payload;
            next();
        } catch (error) {
            console.error("[Error] authenticateToken: " + error);
            return res.status(500).send(error);
        }
    }

    static async Login(req: Request, res: Response) {
        const { username, password } = req.body;
        //Busco usuario en la base de datos
        const user = await UsuarioRepository.GetOneByUsername(username);
        if (!user) {
            return res.status(401).send('Credenciales incorrectas.');
        }
        //Valido contraseña
        const isPasswordValid = await bcrypt.compare(password, user!.password);
        if (!isPasswordValid) {
            return res.status(401).send('Credenciales incorrectas.');
        }
        //Envio el token
        const token = AuthController.generateAccessToken({userId: user._id.toString(), role: (user.role as TipoUsuario).name});
        return res.status(200).json({ data: { token: token, user: user } });
    }

    static TokenRefresh(req: Request, res: Response) {
        //Con el token anterior, el usuario puede solicitar otro
        AuthController.authenticateToken(req, res, function() {
            const token = AuthController.generateAccessToken({userId: req.user!.userId, role: req.user!.role});
            return res.status(200).json(token);
        });
    }

    static Logout(req: Request, res: Response) {
        //ASK ¿Invalidar tokens?
    }
}