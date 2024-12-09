import request from 'supertest';
import app from '../src/app';
import { Subscription } from '../src/schemas/subscriptionSchema';
import { token } from './testingObjects';

describe('[ Route / Subscription ]', () => {
    it('[GetAll] should return 200 OK with an array of subscriptions', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        //const expectedContent;

        //Act (Actuar)
        const res = await request(app).get('/api/subscription').set('Authorization', `Bearer ${token}`);
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBeInstanceOf(Array<Subscription>);
    });

    it('[Create] should return 201 CREATED with a subscription', async () => {
        //Arrange (Planear)
        const expectedStatus = 201;
        const expectedContent = {
            type: "testing"
        };

        //Act (Actuar)
        const res = await request(app).post('/api/subscription').send(expectedContent).set('Authorization', `Bearer ${token}`);
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.type).toBe(expectedContent.type);
    }, 30000);

    let subscriptionId : string;
    const prices = [
        {
            startDate: "2024-09-20T22:56:01.513Z",
            amount: 1
        }
    ]

    it('[Create] should return 201 CREATED with a subscription with prices', async () => {
        //Arrange (Planear)
        const expectedStatus = 201;
        const expectedContent = {
            type: "testing02",
            prices: prices
        }

        //Act (Actuar)
        const res = await request(app).post('/api/subscription').send(expectedContent).set('Authorization', `Bearer ${token}`);
        const content = res.body;
        subscriptionId = content._id;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.type).toContain(expectedContent.type);
    }, 15000);

    it('[GetOneOfAll:Prices] should return 200 OK with a array of prices uploaded previusly', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        const expectedContent = prices;

        //Act (Actuar)
        const res = await request(app).get('/api/subscription/' + subscriptionId + '/prices').set('Authorization', `Bearer ${token}`);
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content[0].startDate).toBe(expectedContent[0].startDate);
        expect(content[0].amount).toBe(expectedContent[0].amount);
    });

    it('[Update] should return 200 OK with an uploaded subscription', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        const expectedContent = {
            type: "updated"
        };

        //Act (Actuar)
        const res = await request(app).put('/api/subscription/' + subscriptionId).send(expectedContent).set('Authorization', `Bearer ${token}`);
        const content = res.body;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content.type).toBe(expectedContent.type);
    });
    
    it('[Delete] should return 202 DELETED with a text', async () => {
        //Arrange (Planear)
        const expectedStatus = 202;
        const expectedContent = "Subscription Borrada";

        //Act (Actuar)
        const res = await request(app).delete('/api/subscription/' + subscriptionId).set('Authorization', `Bearer ${token}`);
        const content = res.text;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBe(expectedContent);
    });

    it('[GetOne] should return 404 NOT-FOUND with a text', async () => {
        //Arrange (Planear)
        const expectedStatus = 404;
        const expectedContent = "No se encontró la subscription.";

        //Act (Actuar)
        const res = await request(app).get('/api/subscription/' + subscriptionId).set('Authorization', `Bearer ${token}`);
        const content = res.text;

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBe(expectedContent);
    });
});

//TODO Probar validaciones de inputs, con sus retornos de la API.
/*describe('[ Validations / Subscription ]', () => {
    
});*/