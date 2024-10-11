//Este ajuste es para cargar la conexion y desconexion en las pruebas con jest
import { connectToDatabase } from "./src/dbMiddleware";
import mongoose from "mongoose";

beforeAll(async () => {
    await connectToDatabase().catch(err => {
        console.error('[X] Error al conectar a la base de datos: ', err);
        process.exit(1); // Salir del proceso si no se puede conectar a la base de datos
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});