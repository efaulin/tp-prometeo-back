import request from 'supertest';
import app from '../src/app';
import { Usuario } from '../src/schemas/usuarioSchema';
import { TestingObjects } from './testingObjects';

describe('[ Route / Usuario ]', () => {
    it('[GetAll] should return 200 OK with an array of usuarios', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        //const expectedContent;

        //Act (Actuar)
        const res = await request(app).get('/api/usuario');
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBeInstanceOf(Array<Usuario>);
    });

    //Para guardar el usuario creado en el siguiente paso, para su uso en consultas y modificaciones
    let createdUser : any;

    it('[Create] should return 201 CREATED with an usuario', async () => {
        //Preparativos para la creacion de un usuario
        const testRole = await TestingObjects.newRole("Tester");
        const testSuscription = await TestingObjects.newSuscription("testingSuscrption");
        
        //Arrange (Planear)
        const startDate = new Date();
        const date2MonthsLater = new Date(startDate);
        date2MonthsLater.setMonth(startDate.getMonth() + 2);
        const expectedStatus = 201;
        const expectedContent = {
            username: "usernameTest",
            password: "passwordTest",
            email: "email@test.jest",
            role: testRole.id.toString(),
            suscripcions: [
                {
                    suscripcionId: testSuscription.id.toString(),
                    startDate: startDate,
                    endDate: date2MonthsLater,
                }
            ],
        };

        //Act (Actuar)
        const res = await request(app).post('/api/usuario').send(expectedContent);
        const content = res.body;
        createdUser = content;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.username).toBe(expectedContent.username);
        expect(content.role.name).toBe(testRole.name);
        expect(content.suscripcions[0].suscripcionId.type).toBe(testSuscription.type);
        expect(content.suscripcions[0].startDate).toBe(expectedContent.suscripcions[0].startDate.toJSON());
    }, 30000);

    it('[GetOne] should return 200 OK with an usuario', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        const expectedContent = createdUser;

        //Act (Actuar)
        const res = await request(app).get('/api/usuario/' + expectedContent._id);
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.username).toBe(expectedContent.username);
        expect(content.password).toBe(expectedContent.password);
        expect(content.role.name).toBe(expectedContent.role.name);
        expect(content.suscripcions[0].suscripcionId.type).toBe(expectedContent.suscripcions[0].suscripcionId.type);
        expect(content.suscripcions[0].startDate).toBe(expectedContent.suscripcions[0].startDate);
    });

    it('[Update] should return 200 OK with an updated usuario', async () => {
        //Preparativos para la modificacion de relaciones de un usuario
        const testRole = await TestingObjects.newRole("New Tester v2.0");
        const testSuscription = await TestingObjects.newSuscription("idk");

        const startDate = new Date();
        const date2MonthsLater = new Date(startDate);
        date2MonthsLater.setDate(startDate.getDate() + 2);
        
        //Arrange (Planear)
        const expectedStatus = 200;
        const expectedContent = {
            username: "updatedName",
            password: "updatedPass",
            email: "updated@mail.gg",
            role: testRole.id.toString(),
            suscripcions: [
                {
                    suscripcionId: testSuscription.id.toString(),
                    startDate: startDate,
                    endDate: date2MonthsLater,
                }
            ],
        };

        //Act (Actuar)
        const res = await request(app).put('/api/usuario/' + createdUser._id).send(expectedContent);
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.username).toBe(expectedContent.username);
        expect(content.role.name).toBe(testRole.name);
        expect(content.suscripcions[0].suscripcionId.type).toBe(testSuscription.type);
        expect(content.suscripcions[0].startDate).toBe(expectedContent.suscripcions[0].startDate.toJSON());
    });

    it('[Delete] should return 202 DELETED with a text', async () => {
        //Arrange (Planear)
        const expectedStatus = 202;
        const expectedContent = "Usuario Borrado";

        //Act (Actuar)
        const res = await request(app).delete('/api/usuario/' + createdUser._id);
        const content = res.text;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBe(expectedContent);
    });

    it('[GetOne] should return 404 NOT-FOUND with a text', async () => {
        //Arrange (Planear)
        const expectedStatus = 404;
        const expectedContent = "No se encontró el usuario.";

        //Act (Actuar)
        const res = await request(app).get('/api/usuario/' + createdUser._id);
        const content = res.text;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBe(expectedContent);
    });
});

//TODO Probar validaciones de inputs, con sus retornos de la API.
/*describe('[ Validations / Usuario ]', () => {
    
});*/