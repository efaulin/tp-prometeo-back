import request from 'supertest';
import app from '../src/app';
import { Usuario } from '../src/schemas/usuarioSchema';

describe('GET /api/usuario/', () => {
    it('should return 200 OK with an array of usuarios', async () => {
        //Arrange (Planear)
        const expectedStatus = 200;
        //const expectedContent;

        //Act (Actuar)
        const res = await request(app).get('/api/usuario');
        const content = JSON.parse(res.text);

        //Assert (Afirmar)
        expect(res.status).toBe(expectedStatus);
        expect(content).toBeInstanceOf(Array<Usuario>);
    });
});