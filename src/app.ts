import express from "express";
import { usuarioRouter } from "./routes/usuarioRoute";
import { categoriaRouter } from "./routes/categoriaRoute";
import { suscripcionRouter } from "./routes/suscripcionRoute";
import { suscripcionPrecioRouter } from "./routes/suscripcionPrecioRoute";
import { coleccionRouter } from "./routes/coleccionRoute";
import { capituloRouter } from "./routes/capituloRoute";
import { logger } from "./logger";

const app = express();

logger(1, app);

app.use(express.json());

app.use("/api/usuario/", usuarioRouter);
app.use("/api/categoria/", categoriaRouter);
app.use("/api/coleccion/", coleccionRouter);
app.use("/api/suscripcion/", suscripcionRouter);
app.use("/api/suscripcionprecio/", suscripcionPrecioRouter);
app.use("/api/capitulo/", capituloRouter);

export default app;