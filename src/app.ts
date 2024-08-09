import express from "express";
import { usuarioRouter } from "./routes/usuarioRoute.js";
import {connectToDatabase} from "./dbMiddleware.js";

const port = 3005;
const app = express();

app.use(express.json());

//app.use(dbMiddleware);
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

connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Servidor corriendo en el puerto ${port}`);
    });
}).catch(err => {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1); // Salir del proceso si no se puede conectar a la base de datos
});