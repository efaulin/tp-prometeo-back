import { getModelForClass, getName, prop, Ref } from '@typegoose/typegoose';

class Autor {
    @prop({ required: true })
    public name!: string;
}

const AutorModel = getModelForClass(Autor);

export { Autor, AutorModel };