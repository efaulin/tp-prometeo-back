import { getModelForClass, prop } from '@typegoose/typegoose';
import { time } from 'console';
import mongoose from 'mongoose';

//Para las relaciones debiles se utiliza un enfoque de one-to-many como subdocumentos
class SuscripcionPrecio {
    @prop({ required: true, default: new Date() })
    public startDate!: Date;

    @prop({ required: true, default: 0 })
    public amount!: Number;
}

class Suscripcion {
    @prop({ required: true })
    public type!: string;

    @prop({ type: () => [SuscripcionPrecio] })
    public prices?: SuscripcionPrecio[];

    constructor(){
        this.prices = new Array<SuscripcionPrecio>;
    };
}

const SuscripcionModel = getModelForClass(Suscripcion);
const SuscripcionPrecioModel = getModelForClass(SuscripcionPrecio);
export { Suscripcion, SuscripcionPrecio, SuscripcionModel, SuscripcionPrecioModel };