import { getModelForClass, getName, prop, Ref } from '@typegoose/typegoose';

class Author {
    @prop({ required: true })
    public name!: string;
}

const AuthorModel = getModelForClass(Author);

export { Author, AuthorModel };