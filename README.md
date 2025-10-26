# API Plantões - Projeto Portfólio

API REST para registro de plantões, metas mensais e autenticação de usuários.

## Funcionalidades
- Cadastro de dias trabalhados (plantões), valor recebido por dia, local, horário trabalhado
- Somatória do valor recebido de forma mensal, trimestral, semestral e anual
- Cadastro e consulta de meta mensal e progresso da meta
- Relatórios e gráficos podem ser gerados a partir dos dados dos endpoints
- Autenticação via JWT (login obrigatório para acessar funcionalidades)
- Documentação Swagger disponível

## Estrutura do Projeto
- `src/models`: Modelos em memória
- `src/services`: Lógica de negócio
- `src/controllers`: Controladores das rotas
- `src/routes`: Rotas da API
- `src/middleware`: Middleware de autenticação JWT
- `resources/swagger.json`: Documentação da API

## Como rodar
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor:
   ```bash
   npm start
   ```
3. Acesse a documentação Swagger em: [http://localhost:3000/swagger](http://localhost:3000/swagger)

## Endpoints principais
- `POST /api/users/register` - Cadastro de usuário
- `POST /api/users/login` - Login (retorna token JWT)
- `POST /api/shifts` - Registrar plantão (autenticado)
- `GET /api/shifts` - Listar plantões do usuário (autenticado)
- `GET /api/shifts/sum?period=monthly&year=2025` - Somatória por período (autenticado)
- `GET /api/shifts/goal-progress?month=10&year=2025` - Progresso da meta mensal (autenticado)
- `POST /api/goals` - Definir meta mensal (autenticado)
- `GET /api/goals?month=10&year=2025` - Consultar meta mensal (autenticado)

## Autenticação
- Após login, utilize o token JWT retornado no header `Authorization: Bearer <token>` para acessar os endpoints protegidos.

## Observações
- Banco de dados em memória (os dados são perdidos ao reiniciar o servidor)
- Relatórios e gráficos podem ser gerados consumindo os endpoints da API
- Para visualizar a documentação completa, acesse `/swagger` no navegador
