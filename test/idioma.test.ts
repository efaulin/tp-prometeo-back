import request from 'supertest';
import app from '../src/app';
import { Idioma } from '../src/schemas/idiomaSchema';

describe('[ Route / Idioma ]', () => {
    it('[GetAll] should return 200 OK with an array of idiomas', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        //const expectedContent;

        //Act (Actuar)
        const res = await request(app).get('/api/idioma');
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBeInstanceOf(Array<Idioma>);
    });

    //Para guardar el usuario creado en el siguiente paso, para su uso en consultas y modificaciones
    let createdLanguage : any;

    it('[Create] should return 201 CREATED with an idioma', async () => {
        //Arrange (Planear)
        const expectedStatus = 201;
        const expectedContent = {
            name: "testish"
        };

        //Act (Actuar)
        const res = await request(app).post('/api/idioma').send(expectedContent);
        const content = res.body;
        createdLanguage = content;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.name).toBe(expectedContent.name);
    }, 15000);

    it('[GetOne] should return 200 OK with an idioma', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        const expectedContent = createdLanguage;

        //Act (Actuar)
        const res = await request(app).get('/api/idioma/' + expectedContent._id);
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.name).toBe(expectedContent.name);
    });

    it('[Update] should return 200 OK with an updated idioma', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        const expectedContent = {
            name: "updatedName",
        };

        //Act (Actuar)
        const res = await request(app).put('/api/idioma/' + createdLanguage._id).send(expectedContent);
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.name).toBe(expectedContent.name);
    });

    it('[Delete] should return 202 DELETED with a text', async () => {
        //Arrange (Planear)
        const expectedStatus = 202;
        const expectedContent = "Idioma Borrado";

        //Act (Actuar)
        const res = await request(app).delete('/api/idioma/' + createdLanguage._id);
        const content = res.text;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBe(expectedContent);
    });

    it('[GetOne] should return 404 NOT-FOUND with a text', async () => {
        //Arrange (Planear)
        const expectedStatus = 404;
        const expectedContent = "No se encontró el idioma.";

        //Act (Actuar)
        const res = await request(app).get('/api/idioma/' + createdLanguage._id);
        const content = res.text;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBe(expectedContent);
    });
});

//TODO Probar validaciones de inputs, con sus retornos de la API.
/*describe('[ Validations / Idioma ]', () => {
    
});*/