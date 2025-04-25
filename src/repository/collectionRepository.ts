import { Collection, CollectionModel } from "../schemas/collectionSchema";
import { HydratedDocument } from 'mongoose';
import { CategoryRepository } from "./categoryRepository";

export class CollectionRepository{
    static async GetOne(id: string): Promise<HydratedDocument<Collection> | null> {
        try {
            const result = await CollectionModel.findById(id);
            if (result) await CollectionRepository.populateRelations(result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    static async GetAll(): Promise<Collection[] | undefined> {
        try {
            const collections = await CollectionModel.find().exec();
            for (let i=0; i < collections.length; i++) {
                await CollectionRepository.populateRelations(collections[i]);
            }
            return collections;
        } catch (error) {
            console.error('Error al obtener las collections:', error);
            throw error;
        }
    }
    static async Create(name:String, description:string, categories:string[]): Promise<HydratedDocument<Collection> | string> {
        try {
            //Reviso que todos los id que recibo en "categories" existan en la BBDD
            let categoryNotExist = "";
            for (let i = 0; i < categories.length && !categoryNotExist; i++) {
                const tmp = await CategoryRepository.GetOne(categories[i]);
                if (tmp == null) {
                    categoryNotExist = categories[i];
                };
            }
            if (!categoryNotExist) {
                //Si todas las categories existen, creo la collection
                const newCol = new CollectionModel({
                    name: name,
                    description: description,
                    categoriesRef: categories,
                });
                const result = await newCol.save();
                if (result) await CollectionRepository.populateRelations(result);
                return result;
            } else {
                return categoryNotExist;
            }
        } catch (error) {
            console.error('Error al crear la colección:', error);
            throw error;
        }
    }
    static async Update(id: string, updateFields: Partial<Collection>): Promise<HydratedDocument<Collection> | null | string> {
        try {
            let categoryNotExist = "";
            if (updateFields.categoriesRef) {
                //Reviso que todos los id que recibo en "categories" existan en la BBDD
                const categories = updateFields.categoriesRef!;
                for (let i = 0; i < categories.length && !categoryNotExist; i++) {
                    const tmp = await CategoryRepository.GetOne(categories[i].toString());
                    if (tmp == null) {
                        categoryNotExist = categories[i].toString();
                    };
                }
            }
            if (!categoryNotExist) {
                // Usa findByIdAndUpdate para actualizar solo los campos proporcionados
                const updatedCol = await CollectionModel.findByIdAndUpdate(id, updateFields, { new: true });
                if (updatedCol) await CollectionRepository.populateRelations(updatedCol);
                return updatedCol;
            } else {
                return categoryNotExist;
            }
        } catch (error) {
            console.error("Error al actualizar colección en la base de datos:", error);
            throw error;
        }
    }
    static async Delete(id: string): Promise<HydratedDocument<Collection> | null> {
        try {
            const result = await CollectionModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Error al eliminar colección:", error);
            throw error;
        }
    }
    static async populateRelations(coll:HydratedDocument<Collection>) {
        await coll.populate('categoriesRef');
    }
}