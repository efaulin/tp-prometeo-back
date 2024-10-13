import { getModelForClass, getName, index, prop, Ref } from '@typegoose/typegoose';
import { Suscripcion } from './suscripcionSchema';

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

    //TODO CRUDusr: Role o Type lo podemos hacer por referencia (ej. Ref<Role>) para estandarizar y evitar depender de poner el mismo string.
    @prop({ required: true })
    public role!: string;

    @prop({ required: true, type: () => [UsuarioSuscripcion] })
    public suscripcions!: UsuarioSuscripcion[];
}

const UsuarioModel = getModelForClass(Usuario);
export { Usuario, UsuarioSuscripcion, UsuarioModel };