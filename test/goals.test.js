const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao');
const postGoals = require('../fixtures/postGoals.json')


describe('Definir meta', () => {
    let token;

    beforeEach(async () => {
    token = await obterToken ('michelleyonezawa', '123456')
    })
    
    describe('POST /goals', () => {
        it('Deve retornar 201 quando definir a meta com sucesso', async () => {
        const bodyGoals = { ...postGoals}

            const resposta = await request(process.env.BASE_URL)
                .post('/api/goals')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyGoals);

            expect(resposta.status).to.equal(201);
        });

        it('Deve retornar 401 quando definir a meta com dados inválidos', async () => {
            const bodyGoals = { ...postGoals }
            bodyGoals.value = "zero";

            const resposta = await request(process.env.BASE_URL)
                .post('/api/goals')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyGoals);

            expect(resposta.status).to.equal(401);
        });
    });
});

describe('Obter meta', () => {
    let token;

    beforeEach(async () => {
        token = await obterToken ('michelleyonezawa', '123456')
    })

    describe('GET /goals', () => {
        it('Deve retornar 200 quando obter meta escolhida com sucesso', async () => {
            
            const resposta = await request(process.env.BASE_URL)
                .get('/api/goals')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    month:'11',
                    year:'2025'
                });

            expect(resposta.status).to.equal(200);
        });

        it('Deve retornar 404 quando solicitar uma meta não existente', async () => {

            const resposta = await request(process.env.BASE_URL)
                .get('/api/goals')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    month:'01',
                    year:'2020'
                });

            expect(resposta.status).to.equal(404);
        });
    });
});