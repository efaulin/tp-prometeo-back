import request from 'supertest';
import app from '../src/app';
import { Language } from '../src/schemas/languageSchema';

describe('[ Route / Language ]', () => {
    it('[GetAll] should return 200 OK with an array of languages', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        //const expectedContent;

        //Act (Actuar)
        const res = await request(app).get('/api/language');
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBeInstanceOf(Array<Language>);
    });

    //Para guardar el user creado en el siguiente paso, para su uso en consultas y modificaciones
    let createdLanguage : any;

    it('[Create] should return 201 CREATED with an language', async () => {
        //Arrange (Planear)
        const expectedStatus = 201;
        const expectedContent = {
            name: "testish"
        };

        //Act (Actuar)
        const res = await request(app).post('/api/language').send(expectedContent);
        const content = res.body;
        createdLanguage = content;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.name).toBe(expectedContent.name);
    }, 30000);

    it('[GetOne] should return 200 OK with an language', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        const expectedContent = createdLanguage;

        //Act (Actuar)
        const res = await request(app).get('/api/language/' + expectedContent._id);
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.name).toBe(expectedContent.name);
    });

    it('[Update] should return 200 OK with an updated language', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        const expectedContent = {
            name: "updatedName",
        };

        //Act (Actuar)
        const res = await request(app).put('/api/language/' + createdLanguage._id).send(expectedContent);
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.name).toBe(expectedContent.name);
    });

    it('[Delete] should return 202 DELETED with a text', async () => {
        //Arrange (Planear)
        const expectedStatus = 202;
        const expectedContent = "Language Borrado";

        //Act (Actuar)
        const res = await request(app).delete('/api/language/' + createdLanguage._id);
        const content = res.text;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBe(expectedContent);
    });

    it('[GetOne] should return 404 NOT-FOUND with a text', async () => {
        //Arrange (Planear)
        const expectedStatus = 404;
        const expectedContent = "No se encontró el language.";

        //Act (Actuar)
        const res = await request(app).get('/api/language/' + createdLanguage._id);
        const content = res.text;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBe(expectedContent);
    });
});

//TODO Probar validaciones de inputs, con sus retornos de la API.
/*describe('[ Validations / Language ]', () => {
    
});*/