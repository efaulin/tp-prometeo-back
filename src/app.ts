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
import { authRouter } from "./routes/authRoute";
import { authenticateToken } from "./tokenMiddleware.js";

const app = express();

logger(0, app);

app.use(express.json());

app.use("/api/usuario/", authenticateToken, usuarioRouter);
app.use("/api/categoria/", authenticateToken, categoriaRouter);
app.use("/api/coleccion/", authenticateToken, coleccionRouter);
app.use("/api/suscripcion/", authenticateToken, suscripcionRouter);
app.use("/api/suscripcionprecio/", authenticateToken, suscripcionPrecioRouter);
app.use("/api/capitulo/", authenticateToken, capituloRouter);
app.use("/api/reproduccion/", authenticateToken, reproduccionRouter);
app.use("/api/idioma/", authenticateToken, idiomaRouter);
app.use("/api/narrador/", authenticateToken, narradorRouter);
app.use("/api/autor/", authenticateToken, autorRouter);
app.use("/api/conductor/", authenticateToken, conductorRouter);
app.use("/api/auth", authRouter);

export default app;