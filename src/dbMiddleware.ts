import mongoose from 'mongoose';

const connStr = process.env.MONGODB_URI;

export const connectToDatabase = async () => {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(connStr, {});
            console.log('Conexión a MongoDB establecida');
        }
    } catch (err) {
        console.error('Error al conectar con MongoDB', err);
        throw err;
    }
};
