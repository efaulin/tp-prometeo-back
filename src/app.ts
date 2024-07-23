import express from "express";
import { usuarioRouter } from "./routes/usuarioRoute.js";
import { categoriaRouter } from "./routes/categoriaRoute.js";

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

app.use("/api/usuario/", usuarioRouter);
app.use("/api/categoria/", categoriaRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});