import { Router, Request, Response } from "express";
import { CategoriaController } from "../controllers/categoriaController.js";

export const categoriaRouter = Router();

categoriaRouter.route("/")
    //GetAll
    .get(async function(req, res) {
        const categorias = await CategoriaController.GetAll();
        //Falta validar error
        return res.json(categorias);
    })
    //Create
    .post(async function(req, res) {
        const {nombre} = req.body;

        //Verifico inputs
        if (!nombre) {
            return res.status(400).send("Que pones?????");
        }

        const newCtg = CategoriaController.New(nombre);
        const result = await CategoriaController.Create(newCtg);

        //Falta validar error
        return res.status(201).send(result);
    })
;//END categoria

categoriaRouter.route("/:id")
    //GetOne
    .get(async function(req, res) {
        //const id = Number.parseInt(req.params.id);
        const id = req.params.id;

        //Verifico inputs
        /*if (isNaN(id)) {
            return res.status(400).send("Que pones?????");
        }*/

        //¿Existe ID?
        const tmpCtg = await CategoriaController.GetOne(id);
        if (tmpCtg) {
            return res.status(201).json(tmpCtg);
        }
        return res.status(404).send("No se encontro ID");
    })
    //Update
    .put(async function(req, res) {
        //const id = Number.parseInt(req.params.id);
        const id = req.params.id;
        const {nombre} = req.body;

        //Verifico inputs
        if (!nombre) {
            return res.status(400).send("Que pones?????");
        }

        //¿Existe ID?
        const tmpCtg = await CategoriaController.GetOne(id);
        if (tmpCtg) {
            const updCtg = CategoriaController.New(nombre, id);
            if (await CategoriaController.Update(updCtg)) {
                return res.status(200).send("Categoria Actualizada");
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
        const tmpCtg = await CategoriaController.GetOne(id);
        if (tmpCtg) {
            if (await CategoriaController.Delete(id)) {
                return res.status(202).send("Categoria Borrada");
            }
        }
        return res.status(404).send("No se encontro ID");
    })
;//END categoria/:id