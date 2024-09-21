import mongoose from 'mongoose';
//TODO ctgrSchema - Adaptar a TYPEGOOSE
const categoriaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }
});

const Categoria = mongoose.model('Categoria', categoriaSchema);
export { Categoria };
