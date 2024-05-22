import express from "express";
import { Usuario } from "./Models/usuario.js";

const port = 3000;
const app = express();

//#region AAA
//        get -> obtener recurso
//       post -> crear nuevo recurso
//     delete -> borrar recurso
//put & patch -> modificar recurso

/* Pequeño logger para depuerar y comprobar peticiones a recursos
0 -> Sin log
1 -> Muestra peticion
2 -> Muestra peticion + protocolo + direccion de acceso
*/
const logger:number = 1;
if (logger > 0) {
    app.use(function(req, res, next) {
        if (logger == 1) {
            console.log("Acceso -> " + req.path);
        } else {
            console.log(`Acceso -> ${req.protocol}://${req.get('host')}${req.originalUrl}`);
        }
        next();
    });
}

app.route("/api/xd/")
    //READ
    .get(function(req, res) {
        res.json(usuarios);
    })
    //CREATE
    .post(function(req, res) {
        res.send("POST request");
    })
    //UPDATE
    .put()
    //DELETE
    .delete()
;//END usuario

app.route("/api/xd/:id")
    .get(function(req, res) {
        const oneUsr:Usuario|undefined = usuarios.find((usr)=>{usr.idusuario == Number.parseInt(req.params.id)})
        if (oneUsr === undefined) {
            res.status(400).send("Error en la solicitud");
        }
        res.json(oneUsr);
    })
    .post()
    .put()
    .delete()
;//END usuario/:id
//#endregion

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});

//Guardo en memoria
const usuarios = [
    new Usuario(
        101,
        "pandugat",
        "xd",
        "efaulin@frro.utn.edu.ar",
        "BCSPN"
    ),
    new Usuario(
        102,
        "hborelli",
        "pass",
        "hborelli@frro.utn.edu.ar",
        "type2"
    ),
    new Usuario(
        103,
        "vcoyle",
        "pass2",
        "vcoyle@frro.utn.edu.ar",
        "type3"
    ),
]