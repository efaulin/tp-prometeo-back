import app from "./app.js";

const port = 3005;

app.listen(port, () => {
    console.log(`-> Servidor corriendo en el puerto ${port}`);
});