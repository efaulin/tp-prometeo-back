import request from 'supertest';
import app from '../src/app';
import { Author } from '../src/schemas/authorSchema';
import { token } from './testingObjects';

describe('[ Route / Author ]', () => {
    it('[GetAll] should return 200 OK with an array of authors', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        //const expectedContent;

        //Act (Actuar)
        const res = await request(app).get('/api/author').set('Authorization', `Bearer ${token}`);
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBeInstanceOf(Array<Author>);
    });

    //Para guardar el user creado en el siguiente paso, para su uso en consultas y modificaciones
    let createdAuthor : any;

    it('[Create] should return 201 CREATED with an author', async () => {
        //Arrange (Planear)
        const expectedStatus = 201;
        const expectedContent = {
            name: "testAuthor"
        };

        //Act (Actuar)
        const res = await request(app).post('/api/author').send(expectedContent).set('Authorization', `Bearer ${token}`);
        const content = res.body;
        createdAuthor = content;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.name).toBe(expectedContent.name);
    }, 30000);

    it('[GetOne] should return 200 OK with an author', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        const expectedContent = createdAuthor;

        //Act (Actuar)
        const res = await request(app).get('/api/author/' + expectedContent._id).set('Authorization', `Bearer ${token}`);
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.name).toBe(expectedContent.name);
    });

    it('[Update] should return 200 OK with an updated author', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        const expectedContent = {
            name: "updatedName",
        };

        //Act (Actuar)
        const res = await request(app).put('/api/author/' + createdAuthor._id).send(expectedContent).set('Authorization', `Bearer ${token}`);
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.name).toBe(expectedContent.name);
    });

    it('[Delete] should return 202 DELETED with a text', async () => {
        //Arrange (Planear)
        const expectedStatus = 202;
        const expectedContent = "Author Borrado";

        //Act (Actuar)
        const res = await request(app).delete('/api/author/' + createdAuthor._id).set('Authorization', `Bearer ${token}`);
        const content = res.text;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBe(expectedContent);
    });

    it('[GetOne] should return 404 NOT-FOUND with a text', async () => {
        //Arrange (Planear)
        const expectedStatus = 404;
        const expectedContent = "No se encontró el author.";

        //Act (Actuar)
        const res = await request(app).get('/api/author/' + createdAuthor._id).set('Authorization', `Bearer ${token}`);
        const content = res.text;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBe(expectedContent);
    });
});

//TODO Probar validaciones de inputs, con sus retornos de la API.
/*describe('[ Validations / Author ]', () => {
    
});*/