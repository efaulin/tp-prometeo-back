import { getModelForClass, getName, prop, Ref } from '@typegoose/typegoose';
import { Categoria } from './categoriaSchema';

class Coleccion {
    @prop({ required: true })
    public name!: string;

    @prop({ required: true, ref: getName(Categoria) })
    public categories!: Ref<Categoria>[];
}

const ColeccionModel = getModelForClass(Coleccion);

export { Coleccion, ColeccionModel };