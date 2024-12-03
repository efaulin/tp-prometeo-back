import { getModelForClass, getName, index, prop, Ref } from '@typegoose/typegoose';
import { Subscription } from './subscriptionSchema';

//Los Roles se agregaran a mano a la base de datos, debido a que solo seran "Admin" y "Client"
class Role {
    @prop({ required: true })
    public name!: string;
}

@index({ userId: 1, startDate: 1 }, { unique: true })
class UserSubscription {
    @prop({ required: true, ref: getName(Subscription) })
    public subscriptionRef!: Ref<Subscription>;

    //Se agrega userId para validar por indice no exitan dos subscriptions con la misma fecha para un mismo user
    @prop({ required: true })
    public userId!: string;

    @prop({ required: true })
    public startDate!: Date;

    @prop({ required: true })
    public endDate!: Date;
}

class User {
    @prop({ required: true, unique: true })
    public username!: string;

    @prop({ required: true })
    public password!: string;

    @prop({ required: true })
    public email!: string;

    @prop({ required: true, ref: getName(Role) })
    public roleRef!: Ref<Role>;

    @prop({ required: true, type: () => [UserSubscription] })
    public subscriptionsRef!: UserSubscription[];
}

const UserModel = getModelForClass(User);
const RoleModel = getModelForClass(Role);

export { User, UserSubscription, Role, UserModel, RoleModel };