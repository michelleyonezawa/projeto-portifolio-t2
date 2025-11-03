const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao');
const sumShifts = require('../fixtures/sumShifts.json')

describe('Soma dos plantões por período', () => {
        let token;

        beforeEach(async () => {
        token = await obterToken ('michelleyonezawa', '123456')
        })
        
    describe('GET /shifts/sum', () => {
        it('Deve retornar 200 quando apresentar somatória correta dos plantões registrados dentro do período escolhido', async () => {
        const bodyShifts = { ...sumShifts}

            const resposta = await request(process.env.BASE_URL)
                .get('/api/shifts/sum')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(sumShifts);

            expect(resposta.status).to.equal(200);
        });

        it('Deve retornar 401 quando buscar soma com dados inválidos', async () => {
            const bodyShifts = { ...sumShifts }
            bodyShifts.period = "2025-11-100";

            const resposta = await request(process.env.BASE_URL)
                .get('/api/shifts/sum')
                .set('Content-Type', 'application/json')
                .send(sumShifts);

            expect(resposta.status).to.equal(401);
        });
    });
});