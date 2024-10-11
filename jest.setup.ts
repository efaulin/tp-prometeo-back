//Este ajuste es para cargar la conexion y desconexion en las pruebas con jest
import { connectToDatabase } from "./src/dbMiddleware";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongoServer = MongoMemoryServer.create();

beforeAll(async () => {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect((await mongoServer).getUri(), {});
            console.log('Conexión a MongoDB Local establecida');
        }
    } catch (err) {
        console.error('Error al conectar con MongoDB Local', err);
        throw err;
    }
});

afterAll(async () => {
    await mongoose.connection.close();
    await (await mongoServer).stop();
});