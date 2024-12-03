import { Replay, ReplayModel } from "../schemas/replaySchema";
import { HydratedDocument } from 'mongoose';
import { UserRepository } from "./userRepository";
import { ChapterRepository } from "./chapterRepository";

export class ReplayRepository{
    static async GetOne(id: string): Promise<HydratedDocument<Replay> | null> {
        try {
            const result = await ReplayModel.findById(id);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async GetAll(): Promise<Replay[] | undefined> {
        try {
            const chapters = await ReplayModel.find().exec();
            return chapters;
        } catch (error) {
            console.error('Error al obtener las replayes:', error);
            throw error;
        }
    }

    /**
     * Mediante un id de **User** o **Chapter**, busca todas sus **Replayes**.
     * @param id Valor id de un **User** o **Chapter**
     * @returns Array de **Replayes** relacionadas con el id ingresado.
     * @async
     */
    static async GetAllOfOne(id: string): Promise<Replay[] | undefined> {
        try {
            let chapters;
            const isUser = await UserRepository.GetOne(id);
            if (isUser) {
                chapters = await ReplayModel.find({ userRef:id }).exec();
            } else {
                const isChapter = await ChapterRepository.GetOne(id);
                if (isChapter) {
                    chapters = await ReplayModel.find({ chapterRef:id }).exec();
                }
            }
            return chapters;
        } catch (error) {
            console.error('Error al obtener las replayes:', error);
            throw error;
        }
    }
    
    static async Create(tmp:Partial<Replay>): Promise<HydratedDocument<Replay> | null> {
        try {
            if (await this.validateRep(tmp)) {
                const newRep = new ReplayModel({ ...tmp });
                await newRep.save();
                return newRep;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error al crear el replay:', error);
            throw error;
        }
    }
    
    static async Update(id: string, updateFields: Partial<Replay>): Promise<HydratedDocument<Replay> | null > {
        try {
            const updatedRep = await ReplayModel.findByIdAndUpdate(id, updateFields, { new: true });
            return updatedRep;
        } catch (error) {
            console.error("Error al actualizar replay en la base de datos:", error);
            throw error;
        }
    }

    static async Delete(id: string): Promise<HydratedDocument<Replay> | null> {
        try {
            const result = await ReplayModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Error al eliminar replay:", error);
            throw error;
        }
    }

    static async validateRep(tmp:Partial<Replay>) {
        const tmpUsr = await UserRepository.GetOne(tmp.userRef!.toString()); 
        const tmpCap = await ChapterRepository.GetOne(tmp.chapterRef!.toString());
        return (tmpUsr && tmpCap);
    }
}