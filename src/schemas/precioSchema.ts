import mongoose, { Schema } from 'mongoose';

const suscripcionPrecioSchema = new mongoose.Schema({
    startDate: { type: Date, required: true, unique: true },
    mount: { type: Float32Array, required: true },
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }
});

const SuscripcionPrecio = mongoose.model('Suscripcion_Precio', suscripcionPrecioSchema);
export { SuscripcionPrecio };