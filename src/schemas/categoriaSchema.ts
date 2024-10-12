import { getModelForClass, prop } from '@typegoose/typegoose';

class Categoria {
    @prop({ required: true })
    public name!: string;
}

const CategoriaModel = getModelForClass(Categoria);

export { Categoria, CategoriaModel };