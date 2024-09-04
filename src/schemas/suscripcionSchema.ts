import { getModelForClass, prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';

//Para las relaciones debiles se utiliza un enfoque de one-to-many como subdocumentos
class SuscripcionPrecio {
    @prop({ required: true, unique: true })
    public startDate!: Date;

    @prop({ required: true })
    public amount!: Number;
}

class Suscripcion {
    @prop({ required: true })
    public type!: string;

    @prop({ type: () => [SuscripcionPrecio] })
    public prices?: SuscripcionPrecio[];
}

const SuscripcionModel = getModelForClass(Suscripcion);
export { Suscripcion, SuscripcionModel };