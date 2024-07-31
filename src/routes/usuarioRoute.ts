import { Router, Request, Response } from "express";
import { UsuarioController } from "../controllers/usuarioController.js";
import { HandleResponse } from "./interfaceReturn.js";

export const usuarioRouter = Router();

const handleResponse = new HandleResponse(
    "Usuario Actualizado",
    "Usuario Borrado",
    "Que pones?????",
    "No se encontro ID",
    "(。_。)"
);

usuarioRouter.route("/")
    //GetAll
    .get(async function(req, res) {
        try {
            const usuarios = await UsuarioController.GetAll();
            return res.json(usuarios);
        } catch {
            return handleResponse.generic(res);
        }
    })
    //Create
    .post(async function(req, res) {
        //Verifico inputs
        if (!UsuarioController.Inputs(req)) {
            return handleResponse.badInput(res);
        }

        const {usuario, contra, email, tipo} = req.body;

        try {
            const newUsr = UsuarioController.New(usuario, contra, email, tipo);
            const result = await UsuarioController.Create(newUsr);

            return res.status(201).send(result);
        } catch {
            return handleResponse.generic(res);
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
            return handleResponse.notFound(res);
        } catch {
            return handleResponse.generic(res);
        }
    })
    //Update
    .put(async function(req, res) {
        //Verifico inputs
        if (!UsuarioController.Inputs(req)) {
            return handleResponse.badInput(res);
        }

        const id = req.params.id;
        const {usuario, contra, email, tipo} = req.body;

        try {
            //¿Existe ID?
            const tmpUsr = await UsuarioController.GetOne(id);
            if (tmpUsr) {
                const updUsr = UsuarioController.New(usuario, contra, email, tipo, id);
                if (await UsuarioController.Update(updUsr)) {
                    return handleResponse.update(res);
                }
                return handleResponse.generic(res);
            }
            return handleResponse.notFound(res);
        } catch {
            return handleResponse.generic(res);
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
                    return handleResponse.delete(res);
                }
            }
            return handleResponse.notFound(res);
        } catch {
            return handleResponse.generic(res);
        }
    })
;//END usuario/:id
