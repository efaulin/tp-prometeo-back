import { Router, Request, Response } from "express";
import { UsuarioRepository } from "../repository/usuarioRepository.js";
import { Usuario } from "../entities/usuarioEntity.js";
import { UsuarioController } from "../controllers/usuarioController.js";

export const usuarioRouter = Router();

usuarioRouter.route("/")
    //READ
    .get(function(req, res) {
        return res.json(UsuarioRepository.GetAll());
    })
    //CREATE
    .post(function(req, res) {
        const {usuario, contraseña, email, tipo} = req.body;

        //Verifico inputs
        if (!usuario || !contraseña || !email || !tipo) {
            return res.status(400).send("Que pones?????");
        }

        const newUsr = UsuarioController.NewUsuario(undefined, usuario, contraseña, email, tipo);
        return res.status(201).send(UsuarioRepository.Create(newUsr));
    })
;//END usuario

usuarioRouter.route("/:id")
    .get(function(req, res) {
        const id = Number.parseInt(req.params.id);

        //Verifico inputs
        if (isNaN(id)) {
            return res.status(400).send("Que pones?????");
        }

        //¿Existe ID?
        const tmpUsr = UsuarioRepository.GetOne(id);
        if (tmpUsr) {
            return res.status(201).json(tmpUsr);
        }
        return res.status(404).send("No se encontro ID");
    })
    .put(function(req, res) {
        const id = Number.parseInt(req.params.id);
        const {usuario, contraseña, email, tipo} = req.body;

        //Verifico inputs
        if (isNaN(id) || !usuario || !contraseña || !email || !tipo) {
            return res.status(400).send("Que pones?????");
        }

        //¿Existe ID?
        const tmpUsr = UsuarioRepository.GetOne(id);
        if (tmpUsr) {
            const updUsr = UsuarioController.NewUsuario(id, usuario, contraseña, email, tipo);
            if (UsuarioRepository.Update(updUsr)) {
                return res.status(200).send("Usuario Actualizado");
            }
            return res.status(500).send("(。_。)");
        }
        return res.status(404).send("No se encontro ID");
    })
    .delete(function(req, res) {
        const id = Number.parseInt(req.params.id);

        //Verifico inputs
        if (isNaN(id)) {
            return res.status(400).send("Que pones?????");
        }

        //¿Existe ID?
        const tmpUsr = UsuarioRepository.GetOne(id);
        if (tmpUsr) {
            if (UsuarioRepository.Delete(tmpUsr.idusuario)) {
                return res.status(202).send("Usuario Borrado");
            }
        }
        return res.status(404).send("No se encontro ID");
    })
;//END usuario/:id

//Nos estamos adelantando...
//Se deja de base para su uso con bases de datos
