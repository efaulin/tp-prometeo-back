import request from 'supertest';
import app from '../src/app';
import { Host } from '../src/schemas/hostSchema';

describe('[ Route / Host ]', () => {
    it('[GetAll] should return 200 OK with an array of hosts', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        //const expectedContent;

        //Act (Actuar)
        const res = await request(app).get('/api/host');
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBeInstanceOf(Array<Host>);
    });

    //Para guardar el user creado en el siguiente paso, para su uso en consultas y modificaciones
    let createdHost : any;

    it('[Create] should return 201 CREATED with an host', async () => {
        //Arrange (Planear)
        const expectedStatus = 201;
        const expectedContent = {
            name: "testHost"
        };

        //Act (Actuar)
        const res = await request(app).post('/api/host').send(expectedContent);
        const content = res.body;
        createdHost = content;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.name).toBe(expectedContent.name);
    }, 30000);

    it('[GetOne] should return 200 OK with an host', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        const expectedContent = createdHost;

        //Act (Actuar)
        const res = await request(app).get('/api/host/' + expectedContent._id);
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.name).toBe(expectedContent.name);
    });

    it('[Update] should return 200 OK with an updated host', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        const expectedContent = {
            name: "updatedName",
        };

        //Act (Actuar)
        const res = await request(app).put('/api/host/' + createdHost._id).send(expectedContent);
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.name).toBe(expectedContent.name);
    });

    it('[Delete] should return 202 DELETED with a text', async () => {
        //Arrange (Planear)
        const expectedStatus = 202;
        const expectedContent = "Host Borrado";

        //Act (Actuar)
        const res = await request(app).delete('/api/host/' + createdHost._id);
        const content = res.text;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBe(expectedContent);
    });

    it('[GetOne] should return 404 NOT-FOUND with a text', async () => {
        //Arrange (Planear)
        const expectedStatus = 404;
        const expectedContent = "No se encontró el host.";

        //Act (Actuar)
        const res = await request(app).get('/api/host/' + createdHost._id);
        const content = res.text;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBe(expectedContent);
    });
});

//TODO Probar validaciones de inputs, con sus retornos de la API.
/*describe('[ Validations / Host ]', () => {
    
});*/