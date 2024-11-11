import request from 'supertest';
import app from '../src/app';
import { Suscripcion } from '../src/schemas/suscripcionSchema';

describe('[ Route / Suscripcion ]', () => {
    it('[GetAll] should return 200 OK with an array of suscripciones', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        //const expectedContent;

        //Act (Actuar)
        const res = await request(app).get('/api/suscripcion');
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBeInstanceOf(Array<Suscripcion>);
    });

    it('[Create] should return 201 CREATED with a suscripcion', async () => {
        //Arrange (Planear)
        const expectedStatus = 201;
        const expectedContent = {
            type: "testing"
        };

        //Act (Actuar)
        const res = await request(app).post('/api/suscripcion').send(expectedContent);
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.type).toBe(expectedContent.type);
    }, 30000);

    let suscripcionId : string;
    const prices = [
        {
            startDate: "2024-09-20T22:56:01.513Z",
            amount: 1
        }
    ]

    it('[Create] should return 201 CREATED with a suscripcion with prices', async () => {
        //Arrange (Planear)
        const expectedStatus = 201;
        const expectedContent = {
            type: "testing02",
            prices: prices
        }

        //Act (Actuar)
        const res = await request(app).post('/api/suscripcion').send(expectedContent);
        const content = res.body;
        suscripcionId = content._id;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.type).toContain(expectedContent.type);
    }, 15000);

    it('[GetOneOfAll:Prices] should return 200 OK with a array of prices uploaded previusly', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        const expectedContent = prices;

        //Act (Actuar)
        const res = await request(app).get('/api/suscripcion/' + suscripcionId + '/prices');
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content[0].startDate).toBe(expectedContent[0].startDate);
        expect(content[0].amount).toBe(expectedContent[0].amount);
    });

    it('[Update] should return 200 OK with an uploaded suscripcion', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        const expectedContent = {
            type: "updated"
        };

        //Act (Actuar)
        const res = await request(app).put('/api/suscripcion/' + suscripcionId).send(expectedContent);
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.type).toBe(expectedContent.type);
    });
    
    it('[Delete] should return 202 DELETED with a text', async () => {
        //Arrange (Planear)
        const expectedStatus = 202;
        const expectedContent = "Suscripcion Borrada";

        //Act (Actuar)
        const res = await request(app).delete('/api/suscripcion/' + suscripcionId);
        const content = res.text;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBe(expectedContent);
    });

    it('[GetOne] should return 404 NOT-FOUND with a text', async () => {
        //Arrange (Planear)
        const expectedStatus = 404;
        const expectedContent = "No se encontró la suscripcion.";

        //Act (Actuar)
        const res = await request(app).get('/api/suscripcion/' + suscripcionId);
        const content = res.text;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBe(expectedContent);
    });
});

//TODO Probar validaciones de inputs, con sus retornos de la API.
/*describe('[ Validations / Suscripcion ]', () => {
    
});*/