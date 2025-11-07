const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao');

describe('Progresso da meta mensal', () => {
    let token;

    beforeEach(async () => {
        token = await obterToken ('michelleyonezawa', '123456')
    })

    describe('GET /shifts/goal-progress', () => {
        it('Deve retornar 200 quando obter o progresso da meta mensal com sucesso', async () => {

            const resposta = await request(process.env.BASE_URL)
                .get('/api/shifts/goal-progress')
                .query({ month: 11, year: 2025 })
                .set('Authorization', `Bearer ${token}`);

            expect(resposta.status).to.equal(200);
        });

        it('Deve retornar 404 quando colocar informações de meta não existente', async () => {

            const resposta = await request(process.env.BASE_URL)
                .get('/api/shifts/goal-progress')
                .set('Authorization', `Bearer ${token}`)

            expect(resposta.status).to.equal(404);
        });
    });
});