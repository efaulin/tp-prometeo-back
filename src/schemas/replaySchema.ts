import { getModelForClass, getName, prop, Ref } from '@typegoose/typegoose';
import { User } from './userSchema';
import { Chapter } from './chapterSchema';

class Replay {
    @prop({ required: true, ref: getName(User) })
    public userRef!: Ref<User>;
    
    @prop({ required: true, ref: getName(Chapter) })
    public chapterRef!: Ref<Chapter>;

    @prop({ required: true, default: 0 })
    public watchedTimeInSec!: number;

    @prop({ })
    public rating?: number;

    @prop({ })
    public review?: string;
}

const ReplayModel = getModelForClass(Replay);

export { Replay, ReplayModel };