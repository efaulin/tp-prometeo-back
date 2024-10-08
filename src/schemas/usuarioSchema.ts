import { getModelForClass, prop } from '@typegoose/typegoose';

class Usuario {
    @prop({ required: true })
    public username!: string;

    @prop({ required: true })
    public password!: string;

    @prop({ required: true })
    public email!: string;

    @prop({ required: true })
    public role!: string;
}

const UsuarioModel = getModelForClass(Usuario);
export { Usuario, UsuarioModel };