import { Capitulo, CapituloModel } from "../schemas/capituloSchema";
import { HydratedDocument } from 'mongoose';
import { ColeccionRepository } from "./coleccionRepository";
import { ConductorRepository } from "./conductorRepository";
import { NarradorRepository } from "./narradorRepository";
import { AutorRepository } from "./autorRepository";
import { IdiomaRepository } from "./idiomaRepository";

export class CapituloRepository{
    static async GetOne(id: string): Promise<HydratedDocument<Capitulo> | null> {
        try {
            const result = await CapituloModel.findById(id);
            if (result) await CapituloRepository.populateRelations(result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async GetAll(): Promise<Capitulo[] | undefined> {
        try {
            const chapters = await CapituloModel.find().exec();
            return chapters;
        } catch (error) {
            console.error('Error al obtener los capitulos:', error);
            throw error;
        }
    }
    
    static async Create(tmpCap:Partial<Capitulo>): Promise<HydratedDocument<Capitulo> | null> {
        try {
            if (await this.validateRelations(tmpCap)) {
                const newCap = new CapituloModel({ ...tmpCap });
                const result = await newCap.save();
                if (result) await CapituloRepository.populateRelations(result);
                return result;
            }
            return null;
        } catch (error) {
            console.error('Error al crear el capitulo:', error);
            throw error;
        }
    }
    
    static async Update(id: string, updateFields: Partial<Capitulo>): Promise<HydratedDocument<Capitulo> | null > {
        try {
            let isAudiobook;
            let isPodcast;

            if (updateFields.coleccionId) {
                const colection = await ColeccionRepository.GetOne(updateFields.coleccionId!.toString());
                if (!colection) return null;
            }
            if (updateFields.language) {
                const language = await IdiomaRepository.GetOne(updateFields.language!.toString());
                if (!language) return null;
            }
            if (updateFields.hosts && (updateFields.authors || updateFields.narrator)) {
                return null
            } else if (updateFields.hosts && updateFields.hosts.length >= 1) {
                let emptyHost = false;
                for (let i=0; i < updateFields.hosts.length && !emptyHost; i++) {
                    const tmp = await ConductorRepository.GetOne(updateFields.hosts[i].toString());
                    if (!tmp) emptyHost = true;
                }
                if (emptyHost) return null;
                isPodcast = true;
            } else {
                if (updateFields.narrator) {
                    const narrator = await NarradorRepository.GetOne(updateFields.narrator!.toString());
                    if (!narrator) return null;
                    isAudiobook = true;
                }
                if (updateFields.authors && updateFields.authors.length >= 1) {
                    let emptyAuthor = false;
                    for (let i=0; i < updateFields.authors.length && !emptyAuthor; i++) {
                        const tmp = await AutorRepository.GetOne(updateFields.authors[i].toString());
                        if (!tmp) emptyAuthor = true;
                    }
                    if (emptyAuthor) return null;
                    isAudiobook = true;
                }
            }
            if (isAudiobook) {
                await CapituloModel.findByIdAndUpdate(id, { hosts: null });
            }
            if (isPodcast) {
                await CapituloModel.findByIdAndUpdate(id, { authors: null, narrator: null });
            }
            const updatedCol = await CapituloModel.findByIdAndUpdate(id, updateFields, { new: true });
            if (updatedCol) await CapituloRepository.populateRelations(updatedCol);
            return updatedCol;
        } catch (error) {
            console.error("Error al actualizar capitulo en la base de datos:", error);
            throw error;
        }
    }

    static async Delete(id: string): Promise<HydratedDocument<Capitulo> | null> {
        try {
            const result = await CapituloModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Error al eliminar capitulo:", error);
            throw error;
        }
    }

    static async validateRelations(tmp:Partial<Capitulo>) : Promise<boolean> {
        const colection = await ColeccionRepository.GetOne(tmp.coleccionId!.toString());
        const language = await IdiomaRepository.GetOne(tmp.language!.toString());
        if (colection && language) {
            if (tmp.hosts) {
                const hosts = await ConductorRepository.GetOne(tmp.hosts.toString());
                if (hosts) return true;
            } else if (tmp.narrator && tmp.authors) {
                const narrator = await NarradorRepository.GetOne(tmp.narrator!.toString());
                const authors = await AutorRepository.GetOne(tmp.authors!.toString());
                if (narrator && authors) return true;
            }
        }
        return false;
    }

    static async populateRelations(chapter:HydratedDocument<Capitulo>) : Promise<void> {
        await chapter.populate('language');
        await chapter.populate('hosts')
        await chapter.populate('authors');
        await chapter.populate('narrator');
    }
}