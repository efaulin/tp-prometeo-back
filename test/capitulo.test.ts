import request from 'supertest';
import app from '../src/app';
import { Chapter } from '../src/schemas/chapterSchema';
import { TestingObjects } from './testingObjects';

describe('[ Route / Chapter ]', () => {
    it('[GetAll] should return 200 OK with an array of chapters', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        //const expectedContent;

        //Act (Actuar)
        const res = await request(app).get('/api/chapter');
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBeInstanceOf(Array<Chapter>);
    });

    //Para guardar el chapter creado en el siguiente paso, para su uso en consultas y modificaciones
    let createdChapter : any;

    it('[Create] should return 201 CREATED with a chapter', async () => {
        //Preparativos para la creacion de un chapter
        const testCollection = await TestingObjects.newCollection("TestCol","TestDesc");
        const testLanguage = await TestingObjects.newLanguage("testish");
        const testHost = await TestingObjects.newHost("HostingTest");
        const uploadDate = new Date();
        const publicationDate = new Date(uploadDate);
        publicationDate.setMonth(publicationDate.getMonth() + 1);
        
        //Arrange (Planear)
        const expectedStatus = 201;
        const expectedContent = {
            collectionId: testCollection._id.toString(),
            name: "testChapter",
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
        const res = await request(app).post('/api/chapter').send(expectedContent);
        const content = res.body;
        createdChapter = content;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.name).toBe(expectedContent.name);
        expect(content.description).toBe(expectedContent.description);
        expect(content.durationInSeconds).toBe(expectedContent.durationInSeconds);
        expect(content.collectionId).toBe(testCollection._id.toString());
        expect(content.hosts[0].name).toBe(testHost.name);
        expect(content.language.name).toBe(testLanguage.name);
        expect(content.uploadDate).toBe(expectedContent.uploadDate);
        expect(content.publicationDate).toBe(expectedContent.publicationDate);
    }, 30000);

    it('[GetOne] should return 200 OK with an chapter', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        const expectedContent = createdChapter;

        //Act (Actuar)
        const res = await request(app).get('/api/chapter/' + expectedContent._id);
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.name).toBe(expectedContent.name);
        expect(content.description).toBe(expectedContent.description);
        expect(content.durationInSeconds).toBe(expectedContent.durationInSeconds);
        expect(content.collectionId).toBe(expectedContent.collectionId);
        expect(content.hosts[0].name).toBe(expectedContent.hosts[0].name);
        expect(content.language.name).toBe(expectedContent.language.name);
        expect(content.uploadDate).toBe(expectedContent.uploadDate);
        expect(content.publicationDate).toBe(expectedContent.publicationDate);
    });

    it('[Update] should return 200 OK with an updated chapter', async () => {
        //Preparativos para la creacion de un chapter
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
            collectionId: testCollection._id.toString(),
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
        const res = await request(app).put('/api/chapter/' + createdChapter._id).send(expectedContent);
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.name).toBe(expectedContent.name);
        expect(content.description).toBe(expectedContent.description);
        expect(content.durationInSeconds).toBe(expectedContent.durationInSeconds);
        expect(content.collectionId).toBe(expectedContent.collectionId);
        expect(content.authors[0].name).toBe(testAuthor.name);
        expect(content.narrator.name).toBe(testNarrator.name);
        expect(content.language.name).toBe(testLanguage.name);
        expect(content.uploadDate).toBe(expectedContent.uploadDate);
        expect(content.publicationDate).toBe(expectedContent.publicationDate);
    });

    it('[Delete] should return 202 DELETED with a text', async () => {
        //Arrange (Planear)
        const expectedStatus = 202;
        const expectedContent = "Chapter Borrado";

        //Act (Actuar)
        const res = await request(app).delete('/api/chapter/' + createdChapter._id);
        const content = res.text;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBe(expectedContent);
    });

    it('[GetOne] should return 404 NOT-FOUND with a text', async () => {
        //Arrange (Planear)
        const expectedStatus = 404;
        const expectedContent = "No se encontró el chapter.";

        //Act (Actuar)
        const res = await request(app).get('/api/chapter/' + createdChapter._id);
        const content = res.text;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBe(expectedContent);
    });
});

//TODO Probar validaciones de inputs, con sus retornos de la API.
/*describe('[ Validations / Chapter ]', () => {
    
});*/