# Sudoku App - Docker Edition

Aplicativo completo de Sudoku com frontend em React, backend em Express/Node.js e banco de dados PostgreSQL, totalmente dockerizado.
 
### Pré-requisitos
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/)

### :whale: Como Executar a Aplicação com Docker

1. **Clone o repositório:**
```bash
git clone https://github.com/ThiagoDeAM/sudoku-app.git
cd sudoku-app
```

2. **Crie os arquivos de chave JWT (se ainda não existirem)**
- Crie a pasta `server/keys/`
- Coloque `private.key` e `public.key` dentro dessa pasta

3. **Configure o arquivo `config.json` com suas credenciais de banco de dados.**
```json
{
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "sudoku",
    "host": "db",
    "dialect": "postgres"
  }
}
```

4. **Execute o Docker Compose**
```bash
docker-compose up --build
```

4. **Rode as migrations do Sequelize (apenas na primeira execução)**
```bash
docker-compose exec backend sh
ln -s src/config config
ln -s src/migrations migrations
npx sequelize-cli db:migrate
```

Importante: Essas migrations só precisam ser executadas uma vez para criar as tabelas no banco de dados.

5. **Acesse no navegador:**
- Frontend (React): http://localhost:3000
- Backend (API): http://localhost:5000

**:file_folder: Estrutura do Projeto**
```bash
Sudoku/
├── frontend/        # React + Vite
│   ├── src/
│   ├── Dockerfile
│   └── .env       # VITE_API_URL=http://localhost:5000
│
├── server/          # Node.js + Express + Sequelize
│   ├── src/
│   │   ├── config/      # config.json do Sequelize
│   │   ├── controllers/
│   │   ├── migrations/  # Migrations do banco
│   │   ├── models/
│   │   ├── routes/
│   ├── Dockerfile
│   └── server.js
│
├── docker-compose.yml
```

**:hammer: Variáveis de Ambiente**
`frontend/.env`
```bash
VITE_API_URL=http://localhost:5000
```

**Explicação dos Arquivos Docker**
`DockerFile`
Define como cada imagem do contêiner será montada. Foram utilizados dois:
- `frontend/Dockerfile`: constrói o app React com Vite e serve via Nginx.
- `server/Dockerfile`: instala dependências Node e roda o `server.js`.
`docker-compose.yml`
Organiza os contêineres `frontend`, `backend` e `db`, cria a rede interna `sudoku-net` e define volumes e variáveis de ambiente para integração.

**Exemplo de .dockerignore**
```bash
# Dependências
node_modules
dist
```

**Tecnologias Utilizadas**
- React + Vite
- Node.js + Express
- Sequelize ORM
- PostgreSQL
- Docker + Docker Compose
- Nginx (para servir a aplicação React)


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
