
# Sudoku API

Esta é a documentação para a API do jogo de Sudoku, construída com Node.js, Express e Sequelize.

## Endpoints

### Registro de Usuário

#### POST `/api/users/register`

Cadastra um novo usuário.

**Parâmetros do Corpo da Requisição:**

```json
{
  "username": "usuário",
  "email": "usuario@example.com",
  "password": "senha123"
}
```
**Respostas Possíveis:**

* `201 Created`: Usuário registrado com sucesso.
* `400 Bad Request`: Dados inválidos ou usuário já existe.
* `500 Internal Server Error`: Erro ao registrar usuário.

**Exemplo de Requisição:**
```bash
curl -X POST http://localhost:3001/api/users/register -H "Content-Type: application/json" -d '{
  "username": "usuário",
  "email": "usuario@example.com",
  "password": "senha123"
}'
```

### Login de Usuário
#### `POST /api/users/login`

Autentica um usuário e retorna um token JWT.

**Parâmetros do Corpo da Requisição:**
```json
{
  "email": "usuario@example.com",
  "password": "senha123"
}
```

**Respostas Possíveis:**

* `200 OK`: Login bem-sucedido.
* `401 Unauthorized`: Senha incorreta.
* `404 Not Found`: Usuário não encontrado.
* `500 Internal Server Error`: Erro ao realizar login.

**Exemplo de Requisição:**
```bash
curl -X POST http://localhost:3001/api/users/login -H "Content-Type: application/json" -d '{
  "email": "usuario@example.com",
  "password": "senha123"
}'
```

### Registro de Tempo de Conclusão
#### `POST /api/games/complete`

Registra o tempo de conclusão de um jogo.

**Parâmetros do Corpo da Requisição:**
```json
{
  "completionTime": 120
}
```
**Respostas Possíveis:**

* `201 Created`: Tempo registrado com sucesso.
* `500 Internal Server Error`: Erro ao registrar o tempo.

**Exemplo de Requisição:**

```bash
curl -X POST http://localhost:3001/api/games/complete -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{
  "completionTime": 120
}'
```

### Ranking
#### `GET /api/games/ranking`
Retorna o ranking dos jogadores baseado no tempo de conclusão.

**Requisição:**
```bash
curl -X GET http://localhost:3001/api/games/ranking -H "Authorization: Bearer <token>"
```
**Respostas Possíveis:**

* `200 OK`: Ranking retornado com sucesso.
* `500 Internal Server Error`: Erro ao obter o ranking.

### Histórico de Jogos
#### `GET /api/users/user-games`

Retorna o histórico de jogos de um usuário específico.

**Requisição:**
```bash
curl -X GET http://localhost:3001/api/users/user-games -H "Authorization: Bearer <token>"
```

**Respostas Possíveis:**

* `200 OK`: Histórico de jogos retornado com sucesso.
* `500 Internal Server Error`: Erro ao obter o histórico de jogos.

## Autenticação
Os endpoints protegidos requerem um token JWT para autenticação. O token deve ser incluído no cabeçalho da requisição como Authorization: Bearer <token>.

**Exemplo de Cabeçalho de Autenticação:**
```makefile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
## Instalação e Execução
### Pré-requisitos
* Node.js
* PostgreSQL
### Configuração
1. Clone o repositório:
```bash
git clone https://github.com/ThiagoDeAM/sudoku-app.git
cd sudoku-api
```
2. Instale as dependências:
```bash
npm install
```
3. Configure o arquivo `config.json` com suas credenciais de banco de dados.

```json
{
  "development": {
    "username": "username",
    "password": "password",
    "database": "database",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "username",
    "password": "password",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "username",
    "password": "password",
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```


4. Insira as suas chaves JWT `public.key` e `private.key` na pasta `/keys`

5. Execute as migrações do banco de dados:
```bash
npx sequelize-cli db:migrate
```

6. Inicie o servidor:
```bash
npm run dev
```
O servidor estará em execução em `http://localhost:3001`.

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença
MIT License
MIT License

Copyright (c) 2024 Thiago Maciel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Este README.md fornece uma visão geral detalhada da API, incluindo exemplos de requisições e respostas.