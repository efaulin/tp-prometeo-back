import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface Payload {
    userId: string;
    role: string;
}

export function generateAccessToken(payload:Payload) {
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_TIMER });
}

export function authenticateToken(req:Request, res:Response, next:NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401).send("Token no ingresado");

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