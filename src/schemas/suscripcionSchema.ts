import { getModelForClass, getName, prop, Ref, index } from '@typegoose/typegoose';

//Para las relaciones debiles se utiliza un enfoque de one-to-many como referencia, para evitar mal rendimiento en caso de un gran historico de precios
@index({ startDate: 1, suscripcionId: 1 }, { unique: true })
class SuscripcionPrecio {
    @prop({ required: true, default: new Date() })
    public startDate!: Date;

    @prop({ required: true, default: 0 })
    public amount!: Number;

    //Se agrega id de la suscripcion para poder crear el indice, y no poder agregar dos precios con la misma fecha
    @prop({ required: true })
    public suscripcionId!: string;
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