import { getModelForClass, getName, prop, Ref } from '@typegoose/typegoose';
import { Usuario } from './usuarioSchema';
import { Capitulo } from './capituloSchema';

class Reproduccion {
    @prop({ required: true, ref: getName(Usuario) })
    public usuarioId!: Ref<Usuario>;
    
    @prop({ required: true, ref: getName(Capitulo) })
    public capituloId!: Ref<Capitulo>;

    @prop({ required: true, default: 0 })
    public watchedTimeInSec!: number;

    @prop({ })
    public rating!: number | undefined;

    @prop({ })
    public review!: string | undefined;
}

const ReproduccionModel = getModelForClass(Reproduccion);

export { Reproduccion, ReproduccionModel };