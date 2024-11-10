import { getModelForClass, getName, prop, Ref } from '@typegoose/typegoose';
import { Coleccion } from './coleccionSchema';
import { Autor } from './autorSchema';
import { Narrador } from './narradorSchema';
import { Conductor } from './conductorSchema';
import { Idioma } from './idiomaSchema';

class Capitulo {
    @prop({ required: true, ref: getName(Coleccion) })
    public coleccionId!: Ref<Coleccion>;

    @prop({ required: true })
    public name!: string;

    //Si tiene "Autor" y "Narrador" es un "Audiolibro"
    @prop({ ref: getName(Autor) })
    public author?: Ref<Autor>[];
    @prop({ ref: getName(Narrador) })
    public narrator?: Ref<Narrador>;

    //Si tiene "Conductor" es un "Podcast"
    @prop({ ref: getName(Conductor) })
    public host?: Ref<Conductor>[];

    @prop({ required: true })
    public durationInSeconds!: Number;

    @prop({ required: true, ref: getName(Idioma) })
    public language!: Ref<Idioma>;

    @prop({ required: true })
    public description!: string;

    @prop({ required: true })
    public uploadDate!: Date;

    @prop({ required: true })
    public publicationDate!: Date;
}

const CapituloModel = getModelForClass(Capitulo);

export { Capitulo, CapituloModel };