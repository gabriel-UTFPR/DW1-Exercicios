# Mercado V.0

Projeto desenvolvido para a disciplina de **Desenvolvimento Web 1 (DW1)** – 2º Bimestre de 2026.

## Descrição

O Mercado V.0 é uma aplicação web baseada na arquitetura **cliente/servidor**, desenvolvida para consultar informações de um banco de dados PostgreSQL.

O sistema permite realizar consultas de clientes e produtos utilizando uma interface em HTML, CSS e JavaScript, comunicando-se com um servidor Node.js através da API Fetch.

---

## Tecnologias utilizadas

### Front-end

* HTML5
* CSS
* JavaScript

### Back-end

* Node.js
* Express
* PostgreSQL
* Biblioteca pg
* dotenv

---

## Funcionalidades

### Login

* Login simples para acesso ao sistema.

### Clientes

* Buscar todos os clientes.
* Buscar cliente por CPF.
* Buscar clientes por nome.

### Produtos

* Buscar todos os produtos.
* Buscar produto por código de barras.
* Buscar por descrição.
* Buscar por tipo.
* Consultar estoque.
* Consultar lucro.

---

## Estrutura do Projeto

```
Mercado V.0/
│
├── Backend/
│   ├── Banco.sql
│   ├── .env
│   └── Server.js
│
├── Frontend/
│   ├── Script.js
│   ├── Login.js
│   ├── Style.css
│   ├── Login.html
│   ├── Inicio.html
│   ├── Cliente.html
│   ├── Produto.html
│   └── imagem/
│
├── .gitignore
└── README.md
```

---

## Banco de Dados

O projeto utiliza PostgreSQL.

O arquivo **Banco.sql** contém:

* criação das tabelas;
* relacionamento entre as tabelas;
* inserção dos registros utilizados pelo sistema.

---

## Configuração

### 1. Instale as dependências

```
npm install
```

---

### 2. Crie um arquivo `.env`

Exemplo:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mercado
DB_USER=postgres
DB_PASSWORD=sua_senha

PORT=3001
```

---

### 3. Execute o banco de dados

Execute o arquivo **Banco.sql** utilizando o PGAdmin4 ou DBeaver.

---

### 4. Inicie o servidor

```
node Server.js
```

ou

```
npm start
```

---

### 5. Abra o sistema

Abra o arquivo **Login.html** no navegador.

Login disponível:

Usuário:

```
gabriel
```

Senha:

```
1234
```

Também é possível utilizar:

Usuário:

```
rjhalmeman
```

Senha:

```
professor
```

---

## Arquitetura

O navegador envia requisições HTTP para o servidor utilizando **Fetch API**.

O servidor recebe as requisições, consulta o banco PostgreSQL e devolve os resultados em formato **JSON**.

O JavaScript interpreta esse JSON e apresenta as informações ao usuário em tabelas.

Fluxo:

```
Cliente
   ↓
HTML + JavaScript
   ↓
Fetch API
   ↓
Node.js / Express
   ↓
PostgreSQL
   ↓
JSON
   ↓
Tela do usuário
```

---

## Autor

Gabriel Soares Pereira

Projeto desenvolvido para a disciplina de Desenvolvimento Web 1 (DW1) – 2º Bimestre de 2026.
