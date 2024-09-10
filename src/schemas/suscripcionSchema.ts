import { getModelForClass, getName, prop, Ref } from '@typegoose/typegoose';
import { time } from 'console';
import mongoose from 'mongoose';

//Para las relaciones debiles se utiliza un enfoque de one-to-many como referencia, para evitar mal rendimiento en caso de un gran historico de precios
class SuscripcionPrecio {
    @prop({ required: true, default: new Date() })
    public startDate!: Date;

    @prop({ required: true, default: 0 })
    public amount!: Number;
}

class Suscripcion {
    @prop({ required: true })
    public type!: string;

    @prop({ ref: getName(SuscripcionPrecio) })
    public prices?: Ref<SuscripcionPrecio>[];
}

const SuscripcionModel = getModelForClass(Suscripcion);
const SuscripcionPrecioModel = getModelForClass(SuscripcionPrecio);
export { Suscripcion, SuscripcionPrecio, SuscripcionModel, SuscripcionPrecioModel };