import { getModelForClass, getName, prop, Ref } from '@typegoose/typegoose';

class Narrator {
    @prop({ required: true })
    public name!: string;
}

const NarratorModel = getModelForClass(Narrator);

export { Narrator, NarratorModel };