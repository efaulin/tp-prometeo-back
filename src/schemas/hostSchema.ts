import { getModelForClass, getName, prop, Ref } from '@typegoose/typegoose';

class Host {
    @prop({ required: true })
    public name!: string;
}

const HostModel = getModelForClass(Host);

export { Host, HostModel };