import mongoose from 'mongoose';

const connStr = process.env.MONGODB_URI || 'mongodb+srv://iamateapot:iamnotateapot1234@cluster0.uuzhuwz.mongodb.net/prometeo?retryWrites=true&w=majority&appName=Cluster0';

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
