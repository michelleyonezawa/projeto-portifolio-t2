const request = require('supertest');
const { expect } = require('chai');

describe('Registrar plantão', () => {
    describe('POST /shifts', () => {
        it('Deve retornar 201 quando registrar um novo plantão com sucesso', async () => {
            
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

            expect(resposta.status).to.equal(201);
        });
    });
});

describe('Registrar plantão', () => {
    describe('POST /shifts', () => {
        it('Deve retornar 400 quando registrar um novo plantão com dados inválidos', async () => {
            
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