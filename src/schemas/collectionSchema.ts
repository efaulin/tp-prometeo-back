import { getModelForClass, getName, prop, Ref } from '@typegoose/typegoose';
import { Category } from './categorySchema';

class Collection {
    @prop({ required: true })
    public name!: string;

    @prop({ required: true })
    public description!: string;

    @prop({ required: true, ref: getName(Category) })
    public categoriesRef!: Ref<Category>[];
}

const CollectionModel = getModelForClass(Collection);

export { Collection, CollectionModel };