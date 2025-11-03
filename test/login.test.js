const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()

describe('Login', () => {
    describe('POST /login', () => {
        it('Deve retornar 200 com um token em string quando usar credenciais válidas', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/api/users/login')
                .set('Content-Type', 'application/json')
                .send({
                    username: 'michelleyonezawa',
                    password: '123456'
                });

            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a('string');
        });


            it('Deve retornar 401 indicando que as credenciais são inválidas', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/api/users/login')
                .set('Content-Type', 'application/json')
                .send({
                    username: 'michelle',
                    password: '123456'
                });

            expect(resposta.status).to.equal(401);
            expect(resposta.body.error).to.equal('Credenciais inválidas');
        });
    });
});