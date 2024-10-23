import { getModelForClass, getName, index, prop, Ref } from '@typegoose/typegoose';
import { Suscripcion } from './suscripcionSchema';

@index({ suscripcionId: 1, startDate: 1 }, { unique: true })
class UsuarioSuscripcion {
    @prop({ required: true, ref: getName(Suscripcion) })
    public suscripcionId!: Ref<Suscripcion>;

    @prop({ required: true })
    public startDate!: Date;

    @prop({ required: true })
    public endDate!: Date;
}

class Usuario {
    @prop({ required: true })
    public username!: string;

    @prop({ required: true })
    public password!: string;

    @prop({ required: true })
    public email!: string;

    @prop({ required: true })
    public role!: string;

    @prop({ required: true, type: () => [UsuarioSuscripcion] })
    public suscripcions!: UsuarioSuscripcion[];
}

const UsuarioModel = getModelForClass(Usuario);
export { Usuario, UsuarioSuscripcion, UsuarioModel };