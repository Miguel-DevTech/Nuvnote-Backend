# Nuvnote📓

🎯 Acesse o projeto: [nuvnote-frontend.vercel.app](https://nuvnote-frontend.vercel.app)  
🗂️ Repositório do Back-End: [github.com/Miguel-DevTech/Nuvnote-Frontend](https://github.com/Miguel-DevTech/Nuvnote-Frontend)

## Descrição

Este é o servidor back-end do Nuvnote, um gerenciador de tarefas com autenticação via JWT e integração com GraphQL.  
A API é construída com **Node.js**, **Express** e **Apollo Server**, conectada a um banco de dados **MongoDB**, e fornece recursos como login, registro de usuários e manipulação de tarefas por meio de queries e mutations.

## Funcionalidades ✅

- 🔐 Registro e login de usuários com autenticação via JWT
- 🍪 Tokens armazenados via cookies HTTP-only (segurança reforçada)
- 📋 CRUD de tarefas com autenticação por sessão
- ⚙️ Middleware para extração e validação de usuário a partir do token
- 🧠 GraphQL com Apollo Server para maior performance e flexibilidade
- 📁 Estrutura modular e escalável

🛠️ Tecnologias Usadas

| Tecnologia         | Finalidade                                      |
|--------------------|-------------------------------------------------|
| Node.js + TypeScript | Ambiente e tipagem estática                    |
| Express            | Framework HTTP para construção da API           |
| Apollo Server      | Integração com GraphQL                          |
| GraphQL            | API estruturada com Queries e Mutations         |
| Mongoose           | ODM para integração com MongoDB                 |
| dotenv             | Carregamento de variáveis de ambiente           |
| cookie-parser      | Leitura e escrita de cookies HTTP-only          |
| cors               | Permitir acesso ao front-end (CORS)             |
| ts-node-dev        | Execução do servidor em modo de desenvolvimento |

## 🚀 Instalação e Execução

Para rodar o projeto localmente:

```bash
# Clone o repositório
git clone https://github.com/Miguel-DevTech/Nuvnote-Backend.git

# Acesse a pasta do projeto
cd Nuvnote-Backend

# Instale as dependências
npm install

# Execute em modo dev
npm run dev

```

## 🧠 Aprendizados

Durante o desenvolvimento do Back-End:

- Implementei autenticação segura via JWT + cookies
- Modelei o banco de dados com Mongoose de forma escalável
- Criei uma API GraphQL completa com Apollo Server
- Apliquei boas práticas de modularização, separação de responsabilidades e validação de contexto

## 📞 Contato

Se quiser trocar uma ideia ou me dar um feedback:

- 💼 [LinkedIn](https://www.linkedin.com/in/miguel-nogueira-de-amorim/)
- 💻 [GitHub](https://github.com/Miguel-DevTech/)
- 📧 miguelnogueiraneto@gmail.com
