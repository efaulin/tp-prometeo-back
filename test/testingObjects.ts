import { HydratedDocument } from "mongoose";
import { Suscripcion, SuscripcionModel } from "../src/schemas/suscripcionSchema";
import { TipoUsuario, TipoUsuarioModel, UsuarioModel } from "../src/schemas/usuarioSchema";
import { Idioma, IdiomaModel } from "../src/schemas/idiomaSchema";
import { Narrador, NarradorModel } from "../src/schemas/narradorSchema";
import { Autor, AutorModel } from "../src/schemas/autorSchema";
import { Conductor, ConductorModel } from "../src/schemas/conductorSchema";
import { Categoria, CategoriaModel } from "../src/schemas/categoriaSchema";
import { Coleccion, ColeccionModel } from "../src/schemas/coleccionSchema";

export class TestingObjects {
    static async newRole(name:string) : Promise<HydratedDocument<TipoUsuario>> {
        const testRole = new TipoUsuarioModel({
            name: name,
        });
        await testRole.save();
        return testRole;
    }

    static async newSuscription(type:string) : Promise<HydratedDocument<Suscripcion>> {
        const testSuscription = new SuscripcionModel({
            type: type,
        });
        await testSuscription.save();
        return testSuscription;
    }

    static async newLanguage(name:string) : Promise<HydratedDocument<Idioma>> {
        const testLanguage = new IdiomaModel({
            name: name,
        });
        await testLanguage.save();
        return testLanguage;
    }

    static async newNarrator(name:string) : Promise<HydratedDocument<Narrador>> {
        const testNarrator = new NarradorModel({
            name: name,
        });
        await testNarrator.save();
        return testNarrator;
    }

    static async newAuthor(name:string) : Promise<HydratedDocument<Autor>> {
        const testAuthor = new AutorModel({
            name: name,
        });
        await testAuthor.save();
        return testAuthor;
    }

    static async newHost(name:string) : Promise<HydratedDocument<Conductor>> {
        const testHost = new ConductorModel({
            name: name,
        });
        await testHost.save();
        return testHost;
    }

    static async newCategory(name:string) : Promise<HydratedDocument<Categoria>> {
        const testCategory = new CategoriaModel({
            name: name,
        });
        await testCategory.save();
        return testCategory;
    }

    static async newCollection(name:string, description:string) : Promise<HydratedDocument<Coleccion>> {
        const testCollection = new ColeccionModel({
            name: name,
            description: description,
            categories: [
                await TestingObjects.newCategory("TestingCategory"),
            ],
        });
        await testCollection.save();
        return testCollection;
    }

    static async newUser(username:string, password:string, email:string) {
        const tmpRol = await TestingObjects.newRole("Tester");
        const tmpSuscp = await TestingObjects.newSuscription("TestSuscription");
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 2);

        const testUser = new UsuarioModel({
            username: username,
            password: password,
            email: email,
            role: tmpRol.id.toString(),
            suscripcions: [
                {
                    suscripcionId: tmpSuscp.id.toString(),
                    startDate: startDate,
                    endDate: endDate,
                }
            ],
        });
        await testUser.save();
        return testUser;
    }
}