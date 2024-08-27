import express from "express";
import { logger } from "./logger.js";
import { usuarioRouter } from "./routes/usuarioRoute.js";
import {connectToDatabase} from "./dbMiddleware.js";
import { categoriaRouter } from "./routes/categoriaRoute.js";


const port = 3000;
const app = express();

app.use(express.json());


logger(1, app);

app.use("/api/usuario/", usuarioRouter);
app.use("/api/categoria/", categoriaRouter);

connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Servidor corriendo en el puerto ${port}`);
    });
}).catch(err => {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1); // Salir del proceso si no se puede conectar a la base de datos
});