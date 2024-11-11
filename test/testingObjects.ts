import { HydratedDocument } from "mongoose";
import { Suscripcion, SuscripcionModel } from "../src/schemas/suscripcionSchema";
import { TipoUsuario, TipoUsuarioModel, UsuarioModel } from "../src/schemas/usuarioSchema";

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