const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao');

describe('Listar plantões', () => {
    describe('GET /shifts', () => {
            let token;

        beforeEach(async () => {
            token = await obterToken ('michelleyonezawa', '123456')
        })
    
        it('Deve retornar 200 para listar todos os plantões registrados', async () => {

            const resposta = await request(process.env.BASE_URL)
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

            const respostaLista = await request(process.env.BASE_URL)
                .get('/api/shifts')
                .set('Authorization', `Bearer ${token}`);

            expect(respostaLista.status).to.equal(200);
            expect(respostaLista.body).to.be.an('array');
        });

        it('Deve retornar 401 quando não for possível listar plantões registrados por usuário não autenticado', async () => {

            const resposta = await request(process.env.BASE_URL)
                .get('/api/shifts');

            expect(resposta.status).to.equal(401);
        });
    });
});