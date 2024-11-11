import { getModelForClass, getName, index, prop, Ref } from '@typegoose/typegoose';
import { Suscripcion } from './suscripcionSchema';

//Los TipoUsuarios se agregaran a mano a la base de datos, debido a que solo seran "Admin" y "Client"
class TipoUsuario {
    @prop({ required: true })
    public name!: string;
}

@index({ userId: 1, startDate: 1 }, { unique: true })
class UsuarioSuscripcion {
    @prop({ required: true, ref: getName(Suscripcion) })
    public suscripcionId!: Ref<Suscripcion>;

    //Se agrega userId para validar por indice no exitan dos suscripciones con la misma fecha para un mismo usuario
    @prop({ required: true })
    public userId!: string;

    @prop({ required: true })
    public startDate!: Date;

    @prop({ required: true })
    public endDate!: Date;
}

class Usuario {
    @prop({ required: true, unique: true })
    public username!: string;

    @prop({ required: true })
    public password!: string;

    @prop({ required: true })
    public email!: string;

    @prop({ required: true, ref: getName(TipoUsuario) })
    public role!: Ref<TipoUsuario>;

    @prop({ required: true, type: () => [UsuarioSuscripcion] })
    public suscripcions!: UsuarioSuscripcion[];
}

const UsuarioModel = getModelForClass(Usuario);
const TipoUsuarioModel = getModelForClass(TipoUsuario);

export { Usuario, UsuarioSuscripcion, TipoUsuario, UsuarioModel, TipoUsuarioModel };