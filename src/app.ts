import express from "express";
import { logger } from "./logger.js";
import { usuarioRouter } from "./routes/usuarioRoute.js";
import {connectToDatabase} from "./dbMiddleware.js";
import { categoriaRouter } from "./routes/categoriaRoute.js";
import { suscripcionRouter } from "./routes/suscripcionRoute.js";
import { suscripcionPrecioRouter } from "./routes/suscripcionPrecioRoute.js";

const app = express();

app.use(express.json());

logger(1, app);

app.use("/api/usuario/", usuarioRouter);
app.use("/api/categoria/", categoriaRouter);
app.use("/api/suscripcion/", suscripcionRouter);
app.use("/api/suscripcionprecio/", suscripcionPrecioRouter);

connectToDatabase().catch(err => {
    console.error('[X] Error al conectar a la base de datos: ', err);
    process.exit(1); // Salir del proceso si no se puede conectar a la base de datos
});

export default app;