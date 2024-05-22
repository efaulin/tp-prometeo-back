import express from "express";
import { Usuario } from "./Models/usuarioModel.js";

const port = 3000;
const app = express();

app.use(express.json());

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

app.route("/api/usuario/")
    //READ
    .get(function(req, res) {
        return res.json(usuarios);
    })
    //CREATE
    .post(function(req, res) {
        const {usuario, contraseña, email, tipo} = req.body;
        if (!usuario || !contraseña || !email || !tipo) {
            return res.status(400).send("Que pones?????")
        }
        //const maxId = usuarios.reduce((max, obj) => (obj.idusuario > max ? obj.idusuario), usuarios[0].idusuario);
        let maxId = 0;
        usuarios.forEach((usr) => {if (usr.idusuario > maxId) {maxId = usr.idusuario}});
        const idusuario = maxId + 1;
        const newUsr = new Usuario(idusuario, usuario, contraseña, email, tipo);

        usuarios.push(newUsr);

        return res.status(201).send(newUsr);
    })
;//END usuario

app.route("/api/usuario/:id")
    .get(function(req, res) {
        const oneUsr:Usuario|undefined = usuarios.find((usr) => usr.idusuario === Number.parseInt(req.params.id));
        if (oneUsr === undefined) {
            return res.status(404).send("No se encontro ID");
        }
        return res.json(oneUsr);
    })
    .put(function(req, res) {
        const indUsr = usuarios.findIndex((usr) => usr.idusuario === Number.parseInt(req.params.id));
        if (indUsr === -1) {
            return res.status(404).send("No se encontro ID")
        }

        const {usuario, contraseña, email, tipo} = req.body;
        if (!usuario || !contraseña || !email || !tipo) {
            return res.status(400).send("Que pones?????")
        }

        usuarios[indUsr] = {...usuarios[indUsr], ...{usuario, contraseña, email, tipo}};
        res.status(200).send(usuarios[indUsr]);
    })
    .delete(function(req, res) {
        const oneUsr:Usuario|undefined = usuarios.find((usr) => usr.idusuario === Number.parseInt(req.params.id));
        if (oneUsr === undefined) {
            return res.status(404).send("No se encontro ID");
        }
        usuarios.splice(usuarios.indexOf(oneUsr),1);
        return res.status(202).json(usuarios);
    })
;//END usuario/:id

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
];