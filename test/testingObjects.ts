import { HydratedDocument } from "mongoose";
import { Subscription, SubscriptionModel } from "../src/schemas/subscriptionSchema";
import { Role, RoleModel, UserModel } from "../src/schemas/userSchema";
import { Language, LanguageModel } from "../src/schemas/languageSchema";
import { Narrator, NarratorModel } from "../src/schemas/narratorSchema";
import { Author, AuthorModel } from "../src/schemas/authorSchema";
import { Host, HostModel } from "../src/schemas/hostSchema";
import { Category, CategoryModel } from "../src/schemas/categorySchema";
import { Collection, CollectionModel } from "../src/schemas/collectionSchema";

export class TestingObjects {
    static async newRole(name:string) : Promise<HydratedDocument<Role>> {
        const testRole = new RoleModel({
            name: name,
        });
        await testRole.save();
        return testRole;
    }

    static async newSuscription(type:string) : Promise<HydratedDocument<Subscription>> {
        const testSuscription = new SubscriptionModel({
            type: type,
        });
        await testSuscription.save();
        return testSuscription;
    }

    static async newLanguage(name:string) : Promise<HydratedDocument<Language>> {
        const testLanguage = new LanguageModel({
            name: name,
        });
        await testLanguage.save();
        return testLanguage;
    }

    static async newNarrator(name:string) : Promise<HydratedDocument<Narrator>> {
        const testNarrator = new NarratorModel({
            name: name,
        });
        await testNarrator.save();
        return testNarrator;
    }

    static async newAuthor(name:string) : Promise<HydratedDocument<Author>> {
        const testAuthor = new AuthorModel({
            name: name,
        });
        await testAuthor.save();
        return testAuthor;
    }

    static async newHost(name:string) : Promise<HydratedDocument<Host>> {
        const testHost = new HostModel({
            name: name,
        });
        await testHost.save();
        return testHost;
    }

    static async newCategory(name:string) : Promise<HydratedDocument<Category>> {
        const testCategory = new CategoryModel({
            name: name,
        });
        await testCategory.save();
        return testCategory;
    }

    static async newCollection(name:string, description:string) : Promise<HydratedDocument<Collection>> {
        const testCollection = new CollectionModel({
            name: name,
            description: description,
            categoriesRef: [
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

        const testUser = new UserModel({
            username: username,
            password: password,
            email: email,
            roleRef: tmpRol.id.toString(),
            subscriptionsRef: [
                {
                    subscriptionRef: tmpSuscp.id.toString(),
                    startDate: startDate,
                    endDate: endDate,
                }
            ],
        });
        await testUser.save();
        return testUser;
    }
}