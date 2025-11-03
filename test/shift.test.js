const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao');

describe('Registrar plantão', () => {
    describe('POST /shifts', () => {
        let token;

        beforeEach(async () => {
            token = await obterToken ('michelleyonezawa', '123456')
        })

        it('Deve retornar 201 quando registrar um novo plantão com sucesso', async () => {

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

            expect(resposta.status).to.equal(201);
        });

        it('Deve retornar 400 quando registrar um novo plantão com dados inválidos', async () => {

            const resposta = await request(process.env.BASE_URL)
                .post('/api/shifts')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    date: "2025-11-100",
                    value: 100,
                    location: "Hospital",
                    startTime: "30:00",
                    endTime: "13:00"
                });

            expect(resposta.status).to.equal(400);
        });
    });
});