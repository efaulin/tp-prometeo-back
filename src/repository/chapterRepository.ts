import { Chapter, ChapterModel } from "../schemas/chapterSchema";
import { HydratedDocument } from 'mongoose';
import { CollectionRepository } from "./collectionRepository";
import { HostRepository } from "./hostRepository";
import { NarratorRepository } from "./narratorRepository";
import { AuthorRepository } from "./authorRepository";
import { LanguageRepository } from "./languageRepository";

export class ChapterRepository{
    static async GetOne(id: string): Promise<HydratedDocument<Chapter> | null> {
        try {
            const result = await ChapterModel.findById(id);
            if (result) await ChapterRepository.populateRelations(result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async GetAll(): Promise<Chapter[] | undefined> {
        try {
            const chapters = await ChapterModel.find().exec();
            for (let i=0; i < chapters.length; i++) {
                await ChapterRepository.populateRelations(chapters[i]);
            }
            return chapters;
        } catch (error) {
            console.error('Error al obtener los chapters:', error);
            throw error;
        }
    }
    
    static async Create(tmpCap:Partial<Chapter>): Promise<HydratedDocument<Chapter> | null> {
        try {
            if (await this.validateRelations(tmpCap)) {
                const newCap = new ChapterModel({ ...tmpCap });
                const result = await newCap.save();
                if (result) await ChapterRepository.populateRelations(result);
                return result;
            }
            return null;
        } catch (error) {
            console.error('Error al crear el chapter:', error);
            throw error;
        }
    }
    
    static async Update(id: string, updateFields: Partial<Chapter>): Promise<HydratedDocument<Chapter> | null > {
        try {
            let isAudiobook;
            let isPodcast;

            if (updateFields.collectionId) {
                const colection = await CollectionRepository.GetOne(updateFields.collectionId!.toString());
                if (!colection) return null;
            }
            if (updateFields.language) {
                const language = await LanguageRepository.GetOne(updateFields.language!.toString());
                if (!language) return null;
            }
            if (updateFields.hosts && (updateFields.authors || updateFields.narrator)) {
                return null
            } else if (updateFields.hosts && updateFields.hosts.length >= 1) {
                let emptyHost = false;
                for (let i=0; i < updateFields.hosts.length && !emptyHost; i++) {
                    const tmp = await HostRepository.GetOne(updateFields.hosts[i].toString());
                    if (!tmp) emptyHost = true;
                }
                if (emptyHost) return null;
                isPodcast = true;
            } else {
                if (updateFields.narrator) {
                    const narrator = await NarratorRepository.GetOne(updateFields.narrator!.toString());
                    if (!narrator) return null;
                    isAudiobook = true;
                }
                if (updateFields.authors && updateFields.authors.length >= 1) {
                    let emptyAuthor = false;
                    for (let i=0; i < updateFields.authors.length && !emptyAuthor; i++) {
                        const tmp = await AuthorRepository.GetOne(updateFields.authors[i].toString());
                        if (!tmp) emptyAuthor = true;
                    }
                    if (emptyAuthor) return null;
                    isAudiobook = true;
                }
            }
            if (isAudiobook) {
                await ChapterModel.findByIdAndUpdate(id, { hosts: null });
            }
            if (isPodcast) {
                await ChapterModel.findByIdAndUpdate(id, { authors: null, narrator: null });
            }
            const updatedCol = await ChapterModel.findByIdAndUpdate(id, updateFields, { new: true });
            if (updatedCol) await ChapterRepository.populateRelations(updatedCol);
            return updatedCol;
        } catch (error) {
            console.error("Error al actualizar chapter en la base de datos:", error);
            throw error;
        }
    }

    static async Delete(id: string): Promise<HydratedDocument<Chapter> | null> {
        try {
            const result = await ChapterModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Error al eliminar chapter:", error);
            throw error;
        }
    }

    static async validateRelations(tmp:Partial<Chapter>) : Promise<boolean> {
        const colection = await CollectionRepository.GetOne(tmp.collectionId!.toString());
        const language = await LanguageRepository.GetOne(tmp.language!.toString());
        if (colection && language) {
            if (tmp.hosts) {
                const hosts = await HostRepository.GetOne(tmp.hosts.toString());
                if (hosts) return true;
            } else if (tmp.narrator && tmp.authors) {
                const narrator = await NarratorRepository.GetOne(tmp.narrator!.toString());
                const authors = await AuthorRepository.GetOne(tmp.authors!.toString());
                if (narrator && authors) return true;
            }
        }
        return false;
    }

    static async populateRelations(chapter:HydratedDocument<Chapter>) : Promise<void> {
        await chapter.populate('language');
        await chapter.populate('hosts')
        await chapter.populate('authors');
        await chapter.populate('narrator');
    }
}