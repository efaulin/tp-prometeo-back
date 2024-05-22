import { Router, Request, Response } from "express";

const usuarios = Router();

usuarios.route("/")
    .get(function(req, res) {
        res.json(usuarios)
    });

//Nos estamos adelantando...
//Se deja de base para su uso con bases de datos