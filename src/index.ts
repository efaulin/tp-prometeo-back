import app from "./app";
import { connectToDatabase } from "./dbMiddleware";

const port = 3005;

connectToDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log(`-> Servidor corriendo en el puerto ${port}`);
        });
    })
    .catch(err => {
        console.error('[X] Error al conectar a la base de datos: ', err);
        process.exit(1); // Salir del proceso si no se puede conectar a la base de datos
    });