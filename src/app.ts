import express from "express";
import { usuarioRouter } from "./routes/usuarioRoute.js";
import { logger } from "./logger.js";

const port = 3000;
const app = express();

app.use(express.json());

logger(1, app);

app.use("/api/usuario/", usuarioRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});