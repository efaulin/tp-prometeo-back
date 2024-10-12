import mongoose from 'mongoose';

const coleccionSchema = new mongoose.Schema({
    name: { type: String, required: true },

    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }
});

const Coleccion = mongoose.model('Coleccion', coleccionSchema);
export { Coleccion };
