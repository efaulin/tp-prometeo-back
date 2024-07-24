import { Router, Request, Response } from "express";
import { UsuarioController } from "../controllers/usuarioController.js";

export const usuarioRouter = Router();

class Return {
    static Update(res:Response) {
        return res.status(200).send("Usuario Actualizado");
    };
    static Delete(res:Response) {
        return res.status(202).send("Usuario Borrado")
    };
    static BadInput(res:Response) {
        return res.status(400).send("Que pones?????");
    };
    static NotFound(res:Response) {
        return res.status(404).send("No se encontro ID");
    };
    static Generic(res:Response) {
        return res.status(500).send("(。_。)");
    };
}

usuarioRouter.route("/")
    //GetAll
    .get(async function(req, res) {
        try {
            const usuarios = await UsuarioController.GetAll();
            return res.json(usuarios);
        } catch {
            return Return.Generic(res);
        }
    })
    //Create
    .post(async function(req, res) {
        //Verifico inputs
        if (!UsuarioController.Inputs(req)) {
            return Return.BadInput(res);
        }

        const {usuario, contra, email, tipo} = req.body;

        try {
            const newUsr = UsuarioController.New(usuario, contra, email, tipo);
            const result = await UsuarioController.Create(newUsr);

            return res.status(201).send(result);
        } catch {
            return Return.Generic(res);
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
            return Return.NotFound(res);
        } catch {
            return Return.Generic(res);
        }
    })
    //Update
    .put(async function(req, res) {
        //Verifico inputs
        if (!UsuarioController.Inputs(req)) {
            return Return.BadInput(res);
        }

        const id = req.params.id;
        const {usuario, contra, email, tipo} = req.body;

        try {
            //¿Existe ID?
            const tmpUsr = await UsuarioController.GetOne(id);
            if (tmpUsr) {
                const updUsr = UsuarioController.New(usuario, contra, email, tipo, id);
                if (await UsuarioController.Update(updUsr)) {
                    return Return.Update(res);
                }
                return Return.Generic(res);
            }
            return Return.NotFound(res);
        } catch {
            return Return.Generic(res);
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
                    return Return.Delete(res);
                }
            }
            return Return.NotFound(res);
        } catch {
            return Return.Generic(res);
        }
    })
;//END usuario/:id
