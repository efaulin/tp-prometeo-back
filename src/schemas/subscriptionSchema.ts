import { getModelForClass, getName, prop, Ref, index } from '@typegoose/typegoose';

class Subscription {
    @prop({ required: true })
    public type!: string;
}

//Para las relaciones debiles se utiliza un enfoque de one-to-many como referencia, para evitar mal rendimiento en caso de un gran historico de precios
@index({ startDate: 1, subscriptionRef: 1 }, { unique: true })
class SubscriptionPrice {
    @prop({ required: true, default: new Date() })
    public startDate!: Date;

    @prop({ required: true, default: 0 })
    public amount!: Number;

    //Se agrega id de la suscripcion para poder crear el indice, y no poder agregar dos precios con la misma fecha
    @prop({ required: true, ref: getName(Subscription) })
    public subscriptionRef!: Ref<SubscriptionPrice>;
}

const SubscriptionModel = getModelForClass(Subscription);
const SubscriptionPriceModel = getModelForClass(SubscriptionPrice);
export { Subscription, SubscriptionPrice, SubscriptionModel, SubscriptionPriceModel };