import { Router, Request, Response } from "express";
import { UsuarioController } from "../controllers/usuarioController.js";
import { Return } from "./interfaceReturn.js";

export const usuarioRouter = Router();

const result = new Return("Usuario Actualizado", "Usuario Borrado", "Que pones?????", "No se encontro ID", "(。_。)");

usuarioRouter.route("/")
    //GetAll
    .get(async function(req, res) {
        try {
            const usuarios = await UsuarioController.GetAll();
            return res.json(usuarios);
        } catch {
            return result.generic(res);
        }
    })
    //Create
    .post(async function(req, res) {
        //Verifico inputs
        if (!UsuarioController.Inputs(req)) {
            return result.badInput(res);
        }

        const {usuario, contra, email, tipo} = req.body;

        try {
            const newUsr = UsuarioController.New(usuario, contra, email, tipo);
            const result = await UsuarioController.Create(newUsr);

            return res.status(201).send(result);
        } catch {
            return result.generic(res);
        }
    })
;//END usuario

usuarioRouter.route("/:id")
    //GetOne
    .get(async function(req, res) {
        const id = req.params.id;

        try {
            //¿Existe ID?
            const tmpUsr = await UsuarioController.GetOne(id);
            if (tmpUsr) {
                return res.status(201).json(tmpUsr);
            }
            return result.notFound(res);
        } catch {
            return result.generic(res);
        }
    })
    //Update
    .put(async function(req, res) {
        //Verifico inputs
        if (!UsuarioController.Inputs(req)) {
            return result.badInput(res);
        }

        const id = req.params.id;
        const {usuario, contra, email, tipo} = req.body;

        try {
            //¿Existe ID?
            const tmpUsr = await UsuarioController.GetOne(id);
            if (tmpUsr) {
                const updUsr = UsuarioController.New(usuario, contra, email, tipo, id);
                if (await UsuarioController.Update(updUsr)) {
                    return result.update(res);
                }
                return result.generic(res);
            }
            return result.notFound(res);
        } catch {
            return result.generic(res);
        }
    })
    //Delete
    .delete(async function(req, res) {
        const id = req.params.id;

        try {
            //¿Existe ID?
            const tmpUsr = await UsuarioController.GetOne(id);
            if (tmpUsr) {
                if (await UsuarioController.Delete(id)) {
                    return result.delete(res);
                }
            }
            return result.notFound(res);
        } catch {
            return result.generic(res);
        }
    })
;//END usuario/:id
