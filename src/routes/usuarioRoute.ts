import { Router, Request, Response } from "express";
import { UsuarioRepository } from "../repository/usuarioRepository.js";
import { Usuario } from "../entities/usuarioEntity.js";
import { UsuarioController } from "../controllers/usuarioController.js";

export const usuarioRouter = Router();

usuarioRouter.route("/")
    //GetAll
    .get(async function(req, res) {
        const usuarios = await UsuarioController.GetAll();
        //Falta validar error
        return res.json(usuarios);
    })
    //Create
    .post(async function(req, res) {
        const {usuario, contra, email, tipo} = req.body;

        //Verifico inputs
        if (!usuario || !contra || !email || !tipo) {
            return res.status(400).send("Que pones?????");
        }

        const newUsr = UsuarioController.New(usuario, contra, email, tipo);
        const result = await UsuarioController.Create(newUsr);

        //Falta validar error
        return res.status(201).send(result);
    })
;//END usuario

usuarioRouter.route("/:id")
    //GetOne
    .get(async function(req, res) {
        //const id = Number.parseInt(req.params.id);
        const id = req.params.id;

        //Verifico inputs
        /*if (isNaN(id)) {
            return res.status(400).send("Que pones?????");
        }*/

        //¿Existe ID?
        const tmpUsr = await UsuarioController.GetOne(id);
        if (tmpUsr) {
            return res.status(201).json(tmpUsr);
        }
        return res.status(404).send("No se encontro ID");
    })
    //Update
    .put(async function(req, res) {
        //const id = Number.parseInt(req.params.id);
        const id = req.params.id;
        const {usuario, contra, email, tipo} = req.body;

        //Verifico inputs
        if (!usuario || !contra || !email || !tipo) {
            return res.status(400).send("Que pones?????");
        }

        //¿Existe ID?
        const tmpUsr = await UsuarioController.GetOne(id);
        if (tmpUsr) {
            const updUsr = UsuarioController.New(id, usuario, contra, email, tipo);
            if (await UsuarioController.Update(updUsr)) {
                return res.status(200).send("Usuario Actualizado");
            }
            return res.status(500).send("(。_。)");
        }
        return res.status(404).send("No se encontro ID");
    })
    //Delete
    .delete(async function(req, res) {
        //const id = Number.parseInt(req.params.id);
        const id = req.params.id;

        //Verifico inputs
        /*if (isNaN(id)) {
            return res.status(400).send("Que pones?????");
        }*/

        //¿Existe ID?
        const tmpUsr = await UsuarioController.GetOne(id);
        if (tmpUsr) {
            if (await UsuarioController.Delete(id)) {
                return res.status(202).send("Usuario Borrado");
            }
        }
        return res.status(404).send("No se encontro ID");
    })
;//END usuario/:id

//Nos estamos adelantando...
//Se deja de base para su uso con bases de datos
