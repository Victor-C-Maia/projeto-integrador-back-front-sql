# Sistema Escolar - Projeto Integrador

API de gerenciamento escolar desenvolvida com Node.js, Express e PostgreSQL.

## Tecnologias

- PostgreSQL
- Node.js
- Express
- pg (node-postgres)

## Estrutura

database/
- schema.sql
- seed.sql

backend/
- API REST com padrão Repository

## Configuração

Criar arquivo:

backend/.env

com:

DATABASE_URL=postgresql://usuario:senha@localhost:5432/sistema_escolar
PORT=3000

## Executar

Entrar na pasta backend:

npm install

npm start

## Rotas principais

GET /alunos

GET /professores

GET /disciplinas

GET /turmas

GET /boletim/aluno/:id