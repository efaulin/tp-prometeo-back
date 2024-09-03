import mongoose from 'mongoose';

const suscripcionSchema = new mongoose.Schema({
    type: { type: String, required: true },
    prices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Suscripcion_Precio"
    }],
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }
});

const Suscripcion = mongoose.model('Suscripcion', suscripcionSchema);
export { Suscripcion };