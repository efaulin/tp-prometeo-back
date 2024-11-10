import { getModelForClass, getName, prop, Ref } from '@typegoose/typegoose';

//Esta clase sera cargada por "Admin"
class Idioma {
    @prop({ required: true })
    public name!: string;
}

const IdiomaModel = getModelForClass(Idioma);

export { Idioma, IdiomaModel };