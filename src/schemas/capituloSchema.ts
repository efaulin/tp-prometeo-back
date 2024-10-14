import { getModelForClass, getName, prop, Ref } from '@typegoose/typegoose';
import { Coleccion } from './coleccionSchema';

class Capitulo {
    @prop({ required: true, ref: getName(Coleccion) })
    public coleccionId!: Ref<Coleccion>;

    @prop({ required: true })
    public name!: string;

    @prop({ required: true })
    public author!: string;

    @prop({ required: true })
    public host!: string;

    @prop({ required: true })
    public producer!: string;

    @prop({ required: true })
    public durationInSeconds!: Number;

    @prop({ required: true })
    public language!: string;

    @prop({ required: true })
    public description!: string;

    @prop({ required: true })
    public narrator!: string;

    @prop({ required: true })
    public publisher!: string;

    @prop({ required: true })
    public uploadDate!: Date;

    @prop({ required: true })
    public publicationDate!: Date;
}

const CapituloModel = getModelForClass(Capitulo);

export { Capitulo, CapituloModel };