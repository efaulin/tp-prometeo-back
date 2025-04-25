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

const addr = "/api/v0.1/";

app.use(express.json());

app.use(addr + "user/", AuthController.authenticateToken, userRouter); //Permisos manejados dentro de su Router
app.use(addr + "category/", AuthController.authenticateToken, categoryRouter); //Permisos manejados dentro de su Router
app.use(addr + "collection/", AuthController.authenticateToken, collectionRouter); //Permisos manejados dentro de su Router
app.use(addr + "subscription/", AuthController.authenticateToken, subscriptionRouter); //Permisos manejados dentro de su Router
app.use(addr + "subscriptionprice/", AuthController.authenticateToken, subscriptionPriceRouter); //Permisos manejados dentro de su Router
app.use(addr + "chapter/", AuthController.authenticateToken, chapterRouter); //Permisos manejados dentro de su Router
app.use(addr + "replay/", AuthController.authenticateToken, AuthController.allowedRoles(["admin"]), replayRouter); //TODO A "client" le puede interesar saber sus replays, o buscar una en especial (GetOne)
app.use(addr + "language/", AuthController.authenticateToken, AuthController.allowedRoles(["admin"]), languageRouter); //Ruta protegida
app.use(addr + "narrator/", AuthController.authenticateToken, AuthController.allowedRoles(["admin"]), narratorRouter); //Ruta protegida
app.use(addr + "author/", AuthController.authenticateToken, AuthController.allowedRoles(["admin"]), authorRouter); //Ruta protegida
app.use(addr + "host/", AuthController.authenticateToken, AuthController.allowedRoles(["admin"]), hostRouter); //Ruta protegida
app.use(addr + "role/", AuthController.authenticateToken, AuthController.allowedRoles(["admin"]), roleRouter); //Ruta protegida
app.use(addr + "auth/", authRouter);

export default app;