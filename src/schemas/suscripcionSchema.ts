import mongoose from 'mongoose';

//Para las relaciones debiles se utiliza un enfoque de one-to-many como subdocumentos
const suscripcionPrecioSchema = new mongoose.Schema({
    startDate: { type: Date, required: true, unique: true },
    amount: { type: Number, required: true },
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }
});

const suscripcionSchema = new mongoose.Schema({
    type: { type: String, required: true },
    prices: [suscripcionPrecioSchema],
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }
});

const Suscripcion = mongoose.model('Suscripcion', suscripcionSchema);
export { Suscripcion };