import request from 'supertest';
import app from '../src/app';
import { Autor } from '../src/schemas/autorSchema';

describe('[ Route / Autor ]', () => {
    it('[GetAll] should return 200 OK with an array of autores', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        //const expectedContent;

        //Act (Actuar)
        const res = await request(app).get('/api/autor');
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBeInstanceOf(Array<Autor>);
    });

    //Para guardar el usuario creado en el siguiente paso, para su uso en consultas y modificaciones
    let createdAuthor : any;

    it('[Create] should return 201 CREATED with an autor', async () => {
        //Arrange (Planear)
        const expectedStatus = 201;
        const expectedContent = {
            name: "testAutor"
        };

        //Act (Actuar)
        const res = await request(app).post('/api/autor').send(expectedContent);
        const content = res.body;
        createdAuthor = content;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.name).toBe(expectedContent.name);
    }, 30000);

    it('[GetOne] should return 200 OK with an autor', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        const expectedContent = createdAuthor;

        //Act (Actuar)
        const res = await request(app).get('/api/autor/' + expectedContent._id);
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.name).toBe(expectedContent.name);
    });

    it('[Update] should return 200 OK with an updated autor', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        const expectedContent = {
            name: "updatedName",
        };

        //Act (Actuar)
        const res = await request(app).put('/api/autor/' + createdAuthor._id).send(expectedContent);
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.name).toBe(expectedContent.name);
    });

    it('[Delete] should return 202 DELETED with a text', async () => {
        //Arrange (Planear)
        const expectedStatus = 202;
        const expectedContent = "Autor Borrado";

        //Act (Actuar)
        const res = await request(app).delete('/api/autor/' + createdAuthor._id);
        const content = res.text;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBe(expectedContent);
    });

    it('[GetOne] should return 404 NOT-FOUND with a text', async () => {
        //Arrange (Planear)
        const expectedStatus = 404;
        const expectedContent = "No se encontró el autor.";

        //Act (Actuar)
        const res = await request(app).get('/api/autor/' + createdAuthor._id);
        const content = res.text;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBe(expectedContent);
    });
});

//TODO Probar validaciones de inputs, con sus retornos de la API.
/*describe('[ Validations / Autor ]', () => {
    
});*/