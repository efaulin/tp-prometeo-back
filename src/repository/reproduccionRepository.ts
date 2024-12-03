import { Reproduccion, ReproduccionModel } from "../schemas/replaySchema";
import { HydratedDocument } from 'mongoose';
import { UsuarioRepository } from "./usuarioRepository";
import { CapituloRepository } from "./capituloRepository";

export class ReproduccionRepository{
    static async GetOne(id: string): Promise<HydratedDocument<Reproduccion> | null> {
        try {
            const result = await ReproduccionModel.findById(id);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async GetAll(): Promise<Reproduccion[] | undefined> {
        try {
            const chapters = await ReproduccionModel.find().exec();
            return chapters;
        } catch (error) {
            console.error('Error al obtener las reproducciones:', error);
            throw error;
        }
    }

    /**
     * Mediante un id de **Usuario** o **Capitulo**, busca todas sus **Reproducciones**.
     * @param id Valor id de un **Usuario** o **Capitulo**
     * @returns Array de **Reproducciones** relacionadas con el id ingresado.
     * @async
     */
    static async GetAllOfOne(id: string): Promise<Reproduccion[] | undefined> {
        try {
            let chapters;
            const isUser = await UsuarioRepository.GetOne(id);
            if (isUser) {
                chapters = await ReproduccionModel.find({ usuarioId:id }).exec();
            } else {
                const isChapter = await CapituloRepository.GetOne(id);
                if (isChapter) {
                    chapters = await ReproduccionModel.find({ capituloId:id }).exec();
                }
            }
            return chapters;
        } catch (error) {
            console.error('Error al obtener las reproducciones:', error);
            throw error;
        }
    }
    
    static async Create(tmp:Partial<Reproduccion>): Promise<HydratedDocument<Reproduccion> | null> {
        try {
            if (await this.validateRep(tmp)) {
                const newRep = new ReproduccionModel({ ...tmp });
                await newRep.save();
                return newRep;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error al crear el reproduccion:', error);
            throw error;
        }
    }
    
    static async Update(id: string, updateFields: Partial<Reproduccion>): Promise<HydratedDocument<Reproduccion> | null > {
        try {
            const updatedRep = await ReproduccionModel.findByIdAndUpdate(id, updateFields, { new: true });
            return updatedRep;
        } catch (error) {
            console.error("Error al actualizar reproduccion en la base de datos:", error);
            throw error;
        }
    }

    static async Delete(id: string): Promise<HydratedDocument<Reproduccion> | null> {
        try {
            const result = await ReproduccionModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Error al eliminar reproduccion:", error);
            throw error;
        }
    }

    static async validateRep(tmp:Partial<Reproduccion>) {
        const tmpUsr = await UsuarioRepository.GetOne(tmp.usuarioId!.toString()); 
        const tmpCap = await CapituloRepository.GetOne(tmp.capituloId!.toString());
        return (tmpUsr && tmpCap);
    }
}