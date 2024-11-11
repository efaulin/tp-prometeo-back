import { getModelForClass, getName, prop, Ref } from '@typegoose/typegoose';

class Narrador {
    @prop({ required: true })
    public name!: string;
}

const NarradorModel = getModelForClass(Narrador);

export { Narrador, NarradorModel };