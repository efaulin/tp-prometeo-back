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
import { AuthController } from "./controllers/authController.js";

const app = express();

logger(0, app);

app.use(express.json());

app.use("/api/usuario/", AuthController.authenticateToken, usuarioRouter);
app.use("/api/categoria/", AuthController.authenticateToken, categoriaRouter);
app.use("/api/coleccion/", AuthController.authenticateToken, coleccionRouter);
app.use("/api/suscripcion/", AuthController.authenticateToken, suscripcionRouter);
app.use("/api/suscripcionprecio/", AuthController.authenticateToken, suscripcionPrecioRouter);
app.use("/api/capitulo/", AuthController.authenticateToken, capituloRouter);
app.use("/api/reproduccion/", AuthController.authenticateToken, reproduccionRouter);
app.use("/api/idioma/", AuthController.authenticateToken, idiomaRouter);
app.use("/api/narrador/", AuthController.authenticateToken, narradorRouter);
app.use("/api/autor/", AuthController.authenticateToken, autorRouter);
app.use("/api/conductor/", AuthController.authenticateToken, conductorRouter);
app.use("/api/auth", authRouter);

export default app;