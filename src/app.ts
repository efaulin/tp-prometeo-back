import express from "express";
import { logger } from "./logger";
import { usuarioRouter } from "./routes/usuarioRoute";
import { categoriaRouter } from "./routes/categoriaRoute";
import { suscripcionRouter } from "./routes/suscripcionRoute";
import { suscripcionPrecioRouter } from "./routes/suscripcionPrecioRoute";

const app = express();

app.use(express.json());

logger(1, app);

app.use("/api/usuario/", usuarioRouter);
app.use("/api/categoria/", categoriaRouter);
app.use("/api/coleccion/", coleccionRouter);
app.use("/api/suscripcion/", suscripcionRouter);
app.use("/api/suscripcionprecio/", suscripcionPrecioRouter);

export default app;