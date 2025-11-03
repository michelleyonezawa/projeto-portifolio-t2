const request = require('supertest');
const { expect } = require('chai');

describe('Registrar plantão', () => {
    describe('POST /shifts', () => {
        it('Deve retornar 201 quando registrar um novo plantão com sucesso', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/api/shifts')
                .set('Content-Type', 'application/json')
                .send({
                    "id": 1,
                    "userId": 1,
                    "date": "2025-11-03",
                    "value": 100,
                    "location": "Hospital",
                    "startTime": "07:00",
                    "endTime": "13:00"

                });

            expect(resposta.status).to.equal(201);
            expect(resposta.body).to.include({
                "id": 1,
                "userId": 1,
                "date": "2025-11-03",
                "value": 100,
                "location": "Hospital",
                "startTime": "07:00",
                "endTime": "13:00"
            });
        });
    });
});