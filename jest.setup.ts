//Este ajuste es para cargar la conexion y desconexion en las pruebas con jest
import { connectToDatabase } from "./src/dbMiddleware";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "./src/app";

const mongoServer = MongoMemoryServer.create();
//let server = app.listen(3005, "127.0.0.1");

beforeAll(async () => {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect((await mongoServer).getUri(), {});
            console.log('Conexión a MongoDB Local establecida');
        }
        jest.resetModules();
    } catch (err) {
        console.error('Error al conectar con MongoDB Local', err);
        throw err;
    }
});

afterAll(async () => {
    await mongoose.connection.close();
    await (await mongoServer).stop();
    //server.close();
});