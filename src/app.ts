import express from "express";
import { usuarioRouter } from "./routes/usuarioRoute";
import { categoriaRouter } from "./routes/categoriaRoute";
import { suscripcionRouter } from "./routes/suscripcionRoute";
import { suscripcionPrecioRouter } from "./routes/suscripcionPrecioRoute";
import { coleccionRouter } from "./routes/coleccionRoute";
import { capituloRouter } from "./routes/capituloRoute";
import { reproduccionRouter } from "./routes/reproduccionRoute";
import { logger } from "./logger";
import { idiomaRouter } from "./routes/idiomaRoute";
import { narradorRouter } from "./routes/narradorRoute";
import { autorRouter } from "./routes/autorRoute";
import { conductorRouter } from "./routes/conductorRoute";

const app = express();

logger(1, app);

app.use(express.json());

app.use("/api/usuario/", usuarioRouter);
app.use("/api/categoria/", categoriaRouter);
app.use("/api/coleccion/", coleccionRouter);
app.use("/api/suscripcion/", suscripcionRouter);
app.use("/api/suscripcionprecio/", suscripcionPrecioRouter);
app.use("/api/capitulo/", capituloRouter);
app.use("/api/reproduccion/", reproduccionRouter);
app.use("/api/idioma/", idiomaRouter);
app.use("/api/narrador/", narradorRouter);
app.use("/api/autor/", autorRouter);
app.use("/api/conductor/", conductorRouter);
//TODO Probar todo lo nuevo
export default app;