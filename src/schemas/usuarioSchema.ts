import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
export { Usuario };
