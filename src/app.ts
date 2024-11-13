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
import { AuthController } from "./controllers/authController";
import { tipoUsuarioRouter } from "./routes/tipoUsuarioRoute";

const app = express();

const cors = require('cors');
app.use(cors({ origin: '*' }));
logger(0, app);

app.use(express.json());

app.use("/api/usuario/", AuthController.authenticateToken, usuarioRouter); //Permisos manejados dentro de su Router
app.use("/api/categoria/", AuthController.authenticateToken, categoriaRouter); //Permisos manejados dentro de su Router
app.use("/api/coleccion/", AuthController.authenticateToken, coleccionRouter); //Permisos manejados dentro de su Router
app.use("/api/suscripcion/", AuthController.authenticateToken, suscripcionRouter); //Permisos manejados dentro de su Router
app.use("/api/suscripcionprecio/", AuthController.authenticateToken, suscripcionPrecioRouter); //Permisos manejados dentro de su Router
app.use("/api/capitulo/", AuthController.authenticateToken, capituloRouter); //Permisos manejados dentro de su Router
app.use("/api/reproduccion/", AuthController.authenticateToken, AuthController.allowedRoles(["admin"]), reproduccionRouter); //TODO A "client" le puede interesar saber sus reproducciones, o buscar una en especial (GetOne)
app.use("/api/idioma/", AuthController.authenticateToken, AuthController.allowedRoles(["admin"]), idiomaRouter); //Ruta protegida
app.use("/api/narrador/", AuthController.authenticateToken, AuthController.allowedRoles(["admin"]), narradorRouter); //Ruta protegida
app.use("/api/autor/", AuthController.authenticateToken, AuthController.allowedRoles(["admin"]), autorRouter); //Ruta protegida
app.use("/api/conductor/", AuthController.authenticateToken, AuthController.allowedRoles(["admin"]), conductorRouter); //Ruta protegida
app.use("/api/tipousuario/", AuthController.authenticateToken, AuthController.allowedRoles(["admin"]), tipoUsuarioRouter); //Ruta protegida
app.use("/api/auth", authRouter);
//TODO Faltan las validaciones de permisos, tengo pensado hacerlo en cada Controller.

export default app;