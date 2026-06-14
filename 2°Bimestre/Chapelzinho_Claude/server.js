const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// ─── LOGIN ────────────────────────────────────────────────────────────────────

app.post('/api/login', async (req, res) => {
    const { nome, senha } = req.body;

    if (!nome || !senha) {
        return res.status(400).json({ status: 'erro', mensagem: 'Informe nome e senha.' });
    }

    try {
        const result = await pool.query(
            'SELECT * FROM public.usuario WHERE nome = $1 AND senha = $2',
            [nome, senha]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ status: 'erro', mensagem: 'Nome ou senha incorretos.' });
        }

        res.json({ status: 'sucesso', mensagem: `Bem-vinda, ${result.rows[0].nome}!` });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ status: 'erro', mensagem: 'Erro interno.' });
    }
});

// ─── ESTOQUE (reposição) ──────────────────────────────────────────────────────

app.get('/api/estoque', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM public.produto ORDER BY nome_produto');

        const reposicao = {};
        result.rows.forEach(p => {
            if (p.quantidade_produto < p.quantidade_minima_produto) {
                reposicao[p.nome_produto] = p.quantidade_maxima_produto - p.quantidade_produto;
            }
        });

        res.json({ sucesso: true, dados_reposicao: reposicao });
    } catch (error) {
        console.error('Erro ao consultar estoque:', error);
        res.status(500).json({ sucesso: false, mensagem: 'Erro interno.' });
    }
});

// ─── PRODUTOS ─────────────────────────────────────────────────────────────────

// Listar todos
app.get('/api/produtos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM public.produto ORDER BY nome_produto');
        res.json({ status: 'sucesso', produtos: result.rows });
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        res.status(500).json({ status: 'erro', mensagem: 'Erro interno.' });
    }
});

// Cadastrar
app.post('/api/produtos', async (req, res) => {
    const { nome_produto, quantidade_produto, quantidade_minima_produto, quantidade_maxima_produto } = req.body;

    if (!nome_produto || quantidade_produto == null || quantidade_minima_produto == null || quantidade_maxima_produto == null) {
        return res.status(400).json({ status: 'erro', mensagem: 'Preencha todos os campos.' });
    }

    if (quantidade_minima_produto >= quantidade_maxima_produto) {
        return res.status(400).json({ status: 'erro', mensagem: 'Quantidade mínima deve ser menor que a máxima.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO public.produto (nome_produto, quantidade_produto, quantidade_minima_produto, quantidade_maxima_produto) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome_produto, quantidade_produto, quantidade_minima_produto, quantidade_maxima_produto]
        );
        res.status(201).json({ status: 'sucesso', mensagem: 'Produto cadastrado!', produto: result.rows[0] });
    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
        res.status(500).json({ status: 'erro', mensagem: 'Erro interno.' });
    }
});

// Editar
app.put('/api/produtos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome_produto, quantidade_produto, quantidade_minima_produto, quantidade_maxima_produto } = req.body;

    if (!nome_produto || quantidade_produto == null || quantidade_minima_produto == null || quantidade_maxima_produto == null) {
        return res.status(400).json({ status: 'erro', mensagem: 'Preencha todos os campos.' });
    }

    if (quantidade_minima_produto >= quantidade_maxima_produto) {
        return res.status(400).json({ status: 'erro', mensagem: 'Quantidade mínima deve ser menor que a máxima.' });
    }

    try {
        const result = await pool.query(
            'UPDATE public.produto SET nome_produto=$1, quantidade_produto=$2, quantidade_minima_produto=$3, quantidade_maxima_produto=$4 WHERE id_produto=$5 RETURNING *',
            [nome_produto, quantidade_produto, quantidade_minima_produto, quantidade_maxima_produto, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ status: 'erro', mensagem: 'Produto não encontrado.' });
        }

        res.json({ status: 'sucesso', mensagem: 'Produto atualizado!', produto: result.rows[0] });
    } catch (error) {
        console.error('Erro ao editar produto:', error);
        res.status(500).json({ status: 'erro', mensagem: 'Erro interno.' });
    }
});

// Deletar
app.delete('/api/produtos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM public.produto WHERE id_produto=$1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ status: 'erro', mensagem: 'Produto não encontrado.' });
        }

        res.json({ status: 'sucesso', mensagem: `Produto "${result.rows[0].nome_produto}" removido.` });
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        res.status(500).json({ status: 'erro', mensagem: 'Erro interno.' });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidorina atenta na porta ${port}`);
});
