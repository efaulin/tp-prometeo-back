import { getModelForClass, prop } from '@typegoose/typegoose';

class Category {
    @prop({ required: true })
    public name!: string;
}

const CategoryModel = getModelForClass(Category);

export { Category, CategoryModel };