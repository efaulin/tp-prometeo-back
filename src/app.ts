import express from "express";
import { logger } from "./logger.js";
import { usuarioRouter } from "./routes/usuarioRoute.js";
import { categoriaRouter } from "./routes/categoriaRoute.js";

const port = 3000;
const app = express();

app.use(express.json());

logger(1, app);

app.use("/api/usuario/", usuarioRouter);
app.use("/api/categoria/", categoriaRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});