import request from 'supertest';
import app from '../src/app';
import { Capitulo } from '../src/schemas/capituloSchema';
import { TestingObjects } from './testingObjects';

describe('[ Route / Capitulo ]', () => {
    it('[GetAll] should return 200 OK with an array of capitulos', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        //const expectedContent;

        //Act (Actuar)
        const res = await request(app).get('/api/capitulo');
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBeInstanceOf(Array<Capitulo>);
    });

    //Para guardar el capitulo creado en el siguiente paso, para su uso en consultas y modificaciones
    let createdChapter : any;

    it('[Create] should return 201 CREATED with a capitulo', async () => {
        //Preparativos para la creacion de un capitulo
        const testCollection = await TestingObjects.newCollection("TestCol","TestDesc");
        const testLanguage = await TestingObjects.newLanguage("testish");
        const testHost = await TestingObjects.newHost("HostingTest");
        const uploadDate = new Date();
        const publicationDate = new Date(uploadDate);
        publicationDate.setMonth(publicationDate.getMonth() + 1);
        
        //Arrange (Planear)
        const expectedStatus = 201;
        const expectedContent = {
            coleccionId: testCollection._id.toString(),
            name: "testCapitulo",
            //Defino solo "host" para que sea un podcast
            hosts: [
                testHost._id.toString(),
            ],
            durationInSeconds: 60,
            language: testLanguage._id.toString(),
            description: "IDK testing desc",
            uploadDate: uploadDate.toJSON(),
            publicationDate: publicationDate.toJSON(),
        };

        //Act (Actuar)
        const res = await request(app).post('/api/capitulo').send(expectedContent);
        const content = res.body;
        createdChapter = content;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.name).toBe(expectedContent.name);
        expect(content.description).toBe(expectedContent.description);
        expect(content.durationInSeconds).toBe(expectedContent.durationInSeconds);
        expect(content.coleccionId).toBe(testCollection._id.toString());
        expect(content.hosts[0].name).toBe(testHost.name);
        expect(content.language.name).toBe(testLanguage.name);
        expect(content.uploadDate).toBe(expectedContent.uploadDate);
        expect(content.publicationDate).toBe(expectedContent.publicationDate);
    }, 30000);

    it('[GetOne] should return 200 OK with an capitulo', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        const expectedContent = createdChapter;

        //Act (Actuar)
        const res = await request(app).get('/api/capitulo/' + expectedContent._id);
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.name).toBe(expectedContent.name);
        expect(content.description).toBe(expectedContent.description);
        expect(content.durationInSeconds).toBe(expectedContent.durationInSeconds);
        expect(content.coleccionId).toBe(expectedContent.coleccionId);
        expect(content.hosts[0].name).toBe(expectedContent.hosts[0].name);
        expect(content.language.name).toBe(expectedContent.language.name);
        expect(content.uploadDate).toBe(expectedContent.uploadDate);
        expect(content.publicationDate).toBe(expectedContent.publicationDate);
    });

    it('[Update] should return 200 OK with an updated capitulo', async () => {
        //Preparativos para la creacion de un capitulo
        const testCollection = await TestingObjects.newCollection("updated","updated");
        const testLanguage = await TestingObjects.newLanguage("testish2");
        const testAuthor = await TestingObjects.newAuthor("AuthorTest");
        const testNarrator = await TestingObjects.newNarrator("NarratorTest");
        const uploadDate = new Date(2025, 5, 5);
        const publicationDate = new Date(uploadDate);
        publicationDate.setMonth(publicationDate.getMonth() + 4);
        
        //Arrange (Planear)
        const expectedStatus = 200;
        const expectedContent = {
            coleccionId: testCollection._id.toString(),
            name: "updatedName",
            //Defino solo "authors" y "narrator" para que sea un audiolibro
            authors: [
                testAuthor._id.toString(),
            ],
            narrator: testNarrator._id.toString(),
            durationInSeconds: 60,
            language: testLanguage._id.toString(),
            description: "IDK testing desc",
            uploadDate: uploadDate.toJSON(),
            publicationDate: publicationDate.toJSON(),
        };

        //Act (Actuar)
        const res = await request(app).put('/api/capitulo/' + createdChapter._id).send(expectedContent);
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.name).toBe(expectedContent.name);
        expect(content.description).toBe(expectedContent.description);
        expect(content.durationInSeconds).toBe(expectedContent.durationInSeconds);
        expect(content.coleccionId).toBe(expectedContent.coleccionId);
        expect(content.authors[0].name).toBe(testAuthor.name);
        expect(content.narrator.name).toBe(testNarrator.name);
        expect(content.language.name).toBe(testLanguage.name);
        expect(content.uploadDate).toBe(expectedContent.uploadDate);
        expect(content.publicationDate).toBe(expectedContent.publicationDate);
    });

    it('[Delete] should return 202 DELETED with a text', async () => {
        //Arrange (Planear)
        const expectedStatus = 202;
        const expectedContent = "Capitulo Borrado";

        //Act (Actuar)
        const res = await request(app).delete('/api/capitulo/' + createdChapter._id);
        const content = res.text;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBe(expectedContent);
    });

    it('[GetOne] should return 404 NOT-FOUND with a text', async () => {
        //Arrange (Planear)
        const expectedStatus = 404;
        const expectedContent = "No se encontró el capitulo.";

        //Act (Actuar)
        const res = await request(app).get('/api/capitulo/' + createdChapter._id);
        const content = res.text;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBe(expectedContent);
    });
});

//TODO Probar validaciones de inputs, con sus retornos de la API.
/*describe('[ Validations / Capitulo ]', () => {
    
});*/