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
            if (updateFields.coleccionId) {
                const colection = await ColeccionRepository.GetOne(updateFields.coleccionId!.toString());
                if (!colection) return null;
            }
            if (updateFields.language) {
                const language = await IdiomaRepository.GetOne(updateFields.language!.toString());
                if (!language) return null;
            }
            if (updateFields.host && (updateFields.author || updateFields.narrator)) {
                return null
            } else if (updateFields.host) {
                const host = await ConductorRepository.GetOne(updateFields.host.toString());
                if (!host) return null;
            } else {
                if (updateFields.narrator) {
                    const narrator = await NarradorRepository.GetOne(updateFields.narrator!.toString());
                    if (!narrator) return null;
                }
                if (updateFields.author) {
                    const author = await AutorRepository.GetOne(updateFields.author!.toString());
                    if (!author) return null;
                }
            }
            const updatedCol = await CapituloModel.findByIdAndUpdate(id, updateFields, { new: true });
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
            if (tmp.host) {
                const host = await ConductorRepository.GetOne(tmp.host.toString());
                if (host) return true;
            } else if (tmp.narrator && tmp.author) {
                const narrator = await NarradorRepository.GetOne(tmp.narrator!.toString());
                const author = await AutorRepository.GetOne(tmp.author!.toString());
                if (narrator && author) return true;
            }
        }
        return false;
    }
}