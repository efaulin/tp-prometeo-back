import { getModelForClass, getName, prop, Ref } from '@typegoose/typegoose';
import { Collection } from './collectionSchema';
import { Author } from './authorSchema';
import { Narrator } from './narratorSchema';
import { Host } from './hostSchema';
import { Language } from './languageSchema';

class Chapter {
    @prop({ required: true, ref: getName(Collection) })
    public collectionRef!: Ref<Collection>;

    @prop({ required: true })
    public name!: string;

    //Si tiene "Author" y "Narrator" es un "Audiolibro"
    @prop({ ref: getName(Author) })
    public authorsRef?: Ref<Author>[];
    @prop({ ref: getName(Narrator) })
    public narratorRef?: Ref<Narrator>;

    //Si tiene "Host" es un "Podcast"
    @prop({ ref: getName(Host) })
    public hostsRef?: Ref<Host>[];

    @prop({ required: true })
    public durationInSeconds!: Number;

    @prop({ required: true, ref: getName(Language) })
    public languageRef!: Ref<Language>;

    @prop({ required: true })
    public description!: string;

    @prop({ required: true })
    public uploadDate!: Date;

    @prop({ required: true })
    public publicationDate!: Date;
}

const ChapterModel = getModelForClass(Chapter);

export { Chapter, ChapterModel };