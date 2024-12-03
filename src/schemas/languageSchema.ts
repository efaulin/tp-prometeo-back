import { getModelForClass, getName, prop, Ref } from '@typegoose/typegoose';

//Esta clase sera cargada por "Admin"
class Language {
    @prop({ required: true })
    public name!: string;
}

const LanguageModel = getModelForClass(Language);

export { Language, LanguageModel };