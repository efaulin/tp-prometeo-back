import request from 'supertest';
import app from '../src/app';
import { Suscripcion } from '../src/schemas/suscripcionSchema';

describe('[ Route / Suscripcion ]', () => {
    it('should return 200 OK with an array of suscripciones', async () => {
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

    it('should return 201 CREATED with a suscripcion', async () => {
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
        expect(content).toMatchObject<Suscripcion>(expectedContent);
    });
});