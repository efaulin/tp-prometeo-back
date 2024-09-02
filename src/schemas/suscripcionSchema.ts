import mongoose, { Schema } from 'mongoose';

const suscripcionSchema = new mongoose.Schema({
    type: { type: String, required: true },
    prices: [{
        type: Schema.Types.ObjectId,
        ref: "Suscripcion_Precio"
    }],
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }
});

const Suscripcion = mongoose.model('Suscripcion', suscripcionSchema);
export { Suscripcion };