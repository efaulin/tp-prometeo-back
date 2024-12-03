import request from 'supertest';
import app from '../src/app';
import { Narrator } from '../src/schemas/narratorSchema';

describe('[ Route / Narrator ]', () => {
    it('[GetAll] should return 200 OK with an array of narrators', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        //const expectedContent;

        //Act (Actuar)
        const res = await request(app).get('/api/narrator');
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBeInstanceOf(Array<Narrator>);
    });

    //Para guardar el user creado en el siguiente paso, para su uso en consultas y modificaciones
    let createdNarrator : any;

    it('[Create] should return 201 CREATED with an narrator', async () => {
        //Arrange (Planear)
        const expectedStatus = 201;
        const expectedContent = {
            name: "testNarra"
        };

        //Act (Actuar)
        const res = await request(app).post('/api/narrator').send(expectedContent);
        const content = res.body;
        createdNarrator = content;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.name).toBe(expectedContent.name);
    }, 30000);

    it('[GetOne] should return 200 OK with an narrator', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        const expectedContent = createdNarrator;

        //Act (Actuar)
        const res = await request(app).get('/api/narrator/' + expectedContent._id);
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.name).toBe(expectedContent.name);
    });

    it('[Update] should return 200 OK with an updated narrator', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        const expectedContent = {
            name: "updatedName",
        };

        //Act (Actuar)
        const res = await request(app).put('/api/narrator/' + createdNarrator._id).send(expectedContent);
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.name).toBe(expectedContent.name);
    });

    it('[Delete] should return 202 DELETED with a text', async () => {
        //Arrange (Planear)
        const expectedStatus = 202;
        const expectedContent = "Narrator Borrado";

        //Act (Actuar)
        const res = await request(app).delete('/api/narrator/' + createdNarrator._id);
        const content = res.text;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBe(expectedContent);
    });

    it('[GetOne] should return 404 NOT-FOUND with a text', async () => {
        //Arrange (Planear)
        const expectedStatus = 404;
        const expectedContent = "No se encontró el narrator.";

        //Act (Actuar)
        const res = await request(app).get('/api/narrator/' + createdNarrator._id);
        const content = res.text;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBe(expectedContent);
    });
});

//TODO Probar validaciones de inputs, con sus retornos de la API.
/*describe('[ Validations / Narrator ]', () => {
    
});*/