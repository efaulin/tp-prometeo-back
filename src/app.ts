import express from "express";
import { userRouter } from "./routes/userRoute";
import { categoryRouter } from "./routes/categoryRoute";
import { subscriptionRouter } from "./routes/subscriptionRoute";
import { subscriptionPriceRouter } from "./routes/subscriptionPriceRoute";
import { collectionRouter } from "./routes/collectionRoute";
import { chapterRouter } from "./routes/chapterRoute";
import { replayRouter } from "./routes/replayRoute";
import { logger } from "./logger";
import { languageRouter } from "./routes/languageRoute";
import { narratorRouter } from "./routes/narratorRoute";
import { authorRouter } from "./routes/authorRoute";
import { hostRouter } from "./routes/hostRoute";
import { authRouter } from "./routes/authRoute";
import { AuthController } from "./controllers/authController";
import { roleRouter } from "./routes/roleRoute";

const app = express();

const cors = require('cors');
app.use(cors({ origin: '*' }));
logger(0, app);

app.use(express.json());

app.use("/api/user/", AuthController.authenticateToken, userRouter); //Permisos manejados dentro de su Router
app.use("/api/category/", AuthController.authenticateToken, categoryRouter); //Permisos manejados dentro de su Router
app.use("/api/collection/", AuthController.authenticateToken, collectionRouter); //Permisos manejados dentro de su Router
app.use("/api/subscription/", AuthController.authenticateToken, subscriptionRouter); //Permisos manejados dentro de su Router
app.use("/api/subscriptionprice/", AuthController.authenticateToken, subscriptionPriceRouter); //Permisos manejados dentro de su Router
app.use("/api/chapter/", AuthController.authenticateToken, chapterRouter); //Permisos manejados dentro de su Router
app.use("/api/replay/", AuthController.authenticateToken, AuthController.allowedRoles(["admin"]), replayRouter); //TODO A "client" le puede interesar saber sus replayes, o buscar una en especial (GetOne)
app.use("/api/language/", AuthController.authenticateToken, AuthController.allowedRoles(["admin"]), languageRouter); //Ruta protegida
app.use("/api/narrator/", AuthController.authenticateToken, AuthController.allowedRoles(["admin"]), narratorRouter); //Ruta protegida
app.use("/api/author/", AuthController.authenticateToken, AuthController.allowedRoles(["admin"]), authorRouter); //Ruta protegida
app.use("/api/host/", AuthController.authenticateToken, AuthController.allowedRoles(["admin"]), hostRouter); //Ruta protegida
app.use("/api/tipouser/", AuthController.authenticateToken, AuthController.allowedRoles(["admin"]), roleRouter); //Ruta protegida
app.use("/api/auth", authRouter);
//TODO Faltan las validaciones de permisos, tengo pensado hacerlo en cada Controller.

export default app;