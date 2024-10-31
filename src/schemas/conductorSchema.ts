import { getModelForClass, getName, prop, Ref } from '@typegoose/typegoose';

class Conductor {
    @prop({ required: true })
    public name!: string;
}

const ConductorModel = getModelForClass(Conductor);

export { Conductor, ConductorModel };