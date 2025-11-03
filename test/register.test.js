const request = require('supertest');
const { expect } = require('chai');


describe('Registro de novo usuário', () => {
    describe('POST /users/register', () => {
        it('Deve retornar 400 indicando que esse usuário já existe', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/api/users/register')
                .set('Content-Type', 'application/json')
                .send({
                    username: 'michelleyonezawa',
                    password: '123456'
                });


            expect(resposta.status).to.equal(400);
            expect(resposta.body.error).to.equal('Usuário já existe');
        });
    });
});