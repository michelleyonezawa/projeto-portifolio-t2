const request = require('supertest');
const { expect } = require('chai');

describe('Listar plantões', () => {
    describe('GET /shifts', () => {
        it('Deve retornar 200 para listar todos os plantões registrados', async () => {
            
            const respostaLogin = await request('http://localhost:3000')
                .post('/api/users/login')
                .set('Content-Type', 'application/json')
                .send({
                    username: 'michelleyonezawa',
                    password: '123456'
                });

            const token = respostaLogin.body.token;

            const resposta = await request('http://localhost:3000')
                .post('/api/shifts')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    date: "2025-11-03",
                    value: 100,
                    location: "Hospital",
                    startTime: "07:00",
                    endTime: "13:00"
                });

            const respostaLista = await request('http://localhost:3000')
                .get('/api/shifts')
                .set('Authorization', `Bearer ${token}`);

            expect(respostaLista.status).to.equal(200);
            expect(respostaLista.body).to.be.an('array');
        });
    });
});

describe('Listar plantões', () => {
    describe('GET /shifts', () => {
        it('Deve retornar 401 quando não for possível listar plantões registrados por usuário não autenticado', async () => {
            
            const resposta = await request('http://localhost:3000')
                .get('/api/shifts');

            expect(resposta.status).to.equal(401);
        });
    });
});