const express = require('express');
const os = require('os');
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
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/api/Cliente/Todos', async (req,res)=>{

    try {
        
        const agora = new Date();
        const dataHora = `${agora.toLocaleDateString('pt-BR')} ${agora.toLocaleTimeString('pt-BR')}`;
        console.log(`Todos os clientes foram listados - ${dataHora}`);

        const query = 'select * from clientes';
        const result= await pool.query(query);

        res.json({ 
            sucesso: true, 
            clientes: result.rows,
            quantidade: result.rows.length
        });

    } catch (error) {
        console.error('Erro ao listar todos os clientes:', error);
        res.status(500).json({ 
            sucesso: false, 
            mensagem: 'Erro interno do servidor' 
        });
    }
});

app.post('/api/Cliente/CPF', async (req,res)=>{
    
    try {
        const {cpf} = req.body;

        if (!cpf) {
            return res.status(400).json({ 
            sucesso: false, 
            mensagem: "CPF vazio!" });
        }

        const agora = new Date();
        const dataHora = `${agora.toLocaleDateString('pt-BR')} ${agora.toLocaleTimeString('pt-BR')}`;
        console.log(`Clientes foram listados por CPF - ${dataHora}`);

        const query = 'select * from clientes where cpf=$1'
        const result= await pool.query(query,[cpf]);

        if (result.rows.length===0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Cliente não encontrado com esse CPF'
            })
        }

        res.json({
            sucesso:true,
            cliente: result.rows[0]
        });

    } catch (error) {
        console.error('Erro ao buscar por CPF:', error);
        res.status(500).json({ 
            sucesso: false, 
            mensagem: 'Erro interno do servidor' 
        }); 
    }
});

app.post('/api/Cliente/Nome', async (req,res)=>{

    try {
        const {nome}=req.body;
        
        if (!nome) {
            return res.status(400).json({ status: "erro", mensagem: "Nome vazio!" });
        }

        const agora = new Date();
        const dataHora = `${agora.toLocaleDateString('pt-BR')} ${agora.toLocaleTimeString('pt-BR')}`;
        console.log(`Clientes foram listados por Nome - ${dataHora}`);

        const query='select * from clientes where nome ilike $1';
        const result= await pool.query(query,[`%${nome}%`]);

        if(result.rows.length===0){
            return res.status(404).json({ 
                sucesso: false, 
                mensagem: 'Nenhum cliente encontrado com este nome' 
            });
        }

        res.json({
            sucesso:true,
            clientes:result.rows,
            quantidade:result.rows.length
        });

    } catch (error) {
        console.error('Erro ao buscar por nome:', error);
        res.status(500).json({ 
            sucesso: false, 
            mensagem: 'Erro interno do servidor' 
        });
    }
});

app.get('/api/Produto/Todos', async (req,res)=>{

    try {
        
        const agora = new Date();
        const dataHora = `${agora.toLocaleDateString('pt-BR')} ${agora.toLocaleTimeString('pt-BR')}`;
        console.log(`Todos os Produtos foram listados - ${dataHora}`);

        const query ='select codigo_barra,descricao,preco,tipo from produtos';
        const result= await pool.query(query);

        if (result.rows.length===0) {
            return res.json({
                sucesso:false,
                mensagem:'Nenhum Produto cadastrado'
            });
        }
        res.json({
            sucesso:true,
            produtos:result.rows,
            quantidade:result.rows.length
        });
        
    } catch (error) {
        console.error('Erro ao listar todos os Produtos:', error);
        res.status(500).json({ 
            sucesso: false, 
            mensagem: 'Erro interno do servidor' 
        });
    }
});

app.post('/api/Produto/Codigo', async (req,res)=>{
    try {
        
        const agora = new Date();
        const dataHora = `${agora.toLocaleDateString('pt-BR')} ${agora.toLocaleTimeString('pt-BR')}`;
        console.log(`Produtos foram listados por Código - ${dataHora}`);
        
        const {codigo}=req.body;
        
        const query='select codigo_barra,descricao,preco,tipo from produtos where codigo_barra=$1';
        const result= await pool.query(query,[codigo]);

        if (result.rows.length===0) {
            return res.status(404).json({
                sucesso:false,
                mensagem:'Nenhum Produto encontrado com este código de barras'
            });
        }

        res.json({
            sucesso:true,
            produto:result.rows[0]
        });


    } catch (error) {
        console.error('Erro ao buscar por Código:', error);
        res.status(500).json({ 
            sucesso: false, 
            mensagem: 'Erro interno do servidor' 
        });
    }
});

app.post('/api/Produto/Descricao', async (req,res)=>{
    try {
        const {descricao}=req.body;

        const agora = new Date();
        const dataHora = `${agora.toLocaleDateString('pt-BR')} ${agora.toLocaleTimeString('pt-BR')}`;
        console.log(`Produtos foram listados por Descrição - ${dataHora}`);

        const query='select codigo_barra,descricao,preco,tipo from produtos where descricao ilike $1';
        const result= await pool.query(query, [`%${descricao}%`]);

        if (result.rows.length===0) {
            return res.status(404).json({
                sucesso:false,
                mensagem:'Nenhum produto encontrado com essa descrição'
            })
        }

        res.json({
            sucesso:true,
            produtos:result.rows,
            quantidade:result.rows.length
        });
 
    } catch (error) {
        console.error('Erro ao listar Produtos por descrição:', error);
        res.status(500).json({ 
            sucesso: false, 
            mensagem: 'Erro interno do servidor' 
        });
    }

});

app.post('/api/Produto/Tipo', async (req,res)=>{
    try {
        const {tipo}=req.body;
        
        const agora = new Date();
        const dataHora = `${agora.toLocaleDateString('pt-BR')} ${agora.toLocaleTimeString('pt-BR')}`;
        console.log(`Produtos foram listados por Tipo - ${dataHora}`);

        const query='select codigo_barra,descricao,preco,tipo from produtos where tipo ilike $1';
        const result= await pool.query(query,[`%${tipo}%`]);

        if(result.rows.length===0){
            return res.status(404).json({
                sucesso:false,
                mensagem:'Nenhum produto encontrado com esse tipo'
            });
        }

        res.json({
            sucesso:true,
            produtos:result.rows,
            quantidade:result.rows.length
        });
    } catch (error) {
        console.error('Erro ao listar Produtos por Tipo:', error);
        res.status(500).json({ 
            sucesso: false, 
            mensagem: 'Erro interno do servidor' 
        });
    }
});

app.get('/api/Produto/Estoque', async (req,res)=>{
    try {
        const agora = new Date();
        const dataHora = `${agora.toLocaleDateString('pt-BR')} ${agora.toLocaleTimeString('pt-BR')}`;
        console.log(`Estoque de todos os Produtos foram listados - ${dataHora}`); 

        const query='select codigo_barra,descricao,estoque_minimo,estoque_atual,estoque_maximo from produtos';
        const result= await pool.query(query);

        if (result.rows.length===0) {
            return res.status(404).json({
                sucesso:false,
                mensagem:'Nenhum produto Cadastrado'
            });
        }

        res.json({
            sucesso:true,
            produtos:result.rows,
            quantidade:result.rows.length
        })
    } catch (error) {
        console.error('Erro ao consultar estoque de todos os Produtos:', error);
        res.status(500).json({ 
            sucesso: false, 
            mensagem: 'Erro interno do servidor' 
        });
    }
});

app.post('/api/Produto/Estoque/Codigo', async (req,res)=>{
    try {
        const {codigo}=req.body;
        
        const agora = new Date();
        const dataHora = `${agora.toLocaleDateString('pt-BR')} ${agora.toLocaleTimeString('pt-BR')}`;
        console.log(`Estoque de Produtos foi consultado por código de barras - ${dataHora}`); 
        
        const query='select codigo_barra,descricao,estoque_minimo,estoque_atual,estoque_maximo from produtos where codigo_barra=$1';
        
        const result= await pool.query(query,[codigo]);
    
        if (result.rows.length===0) {
            return res.status(404).json({
                sucesso:false,
                mensagem:'Nenhum produto encontrado com esse código'
            });
        }
        
        res.json({
            sucesso:true,
            produto:result.rows[0],
        });

    } catch (error) {
        console.error('Erro ao consultar estoque de Produto por código:', error);
        res.status(500).json({ 
            sucesso: false, 
            mensagem: 'Erro interno do servidor' 
        });
    }
   
});

app.get('/api/Produto/Lucro', async (req,res)=>{
    try {
        const agora = new Date();
        const dataHora = `${agora.toLocaleDateString('pt-BR')} ${agora.toLocaleTimeString('pt-BR')}`;
        console.log(`Lucro de todos os Produtos foram listados - ${dataHora}`); 

        const query='select codigo_barra,descricao,preco,custo from produtos';
        const result= await pool.query(query);

        if (result.rows.length===0) {
            return res.status(404).json({
                sucesso:false,
                mensagem:'Nenhum produto Cadastrado'
            });
        }

        res.json({
            sucesso:true,
            produtos:result.rows,
            quantidade:result.rows.length
        }); 
    } catch (error) {
        console.error('Erro ao consultar Lucro de todos os Produto:', error);
        res.status(500).json({ 
            sucesso: false, 
            mensagem: 'Erro interno do servidor' 
        });
    }
});

app.post('/api/Produto/Lucro/Codigo', async (req,res)=>{
    try {
        const {codigo}= req.body;
        
        const agora = new Date();
        const dataHora = `${agora.toLocaleDateString('pt-BR')} ${agora.toLocaleTimeString('pt-BR')}`;
        console.log(`Lucro de Produto foi listado - ${dataHora}`); 

        const query='select codigo_barra,descricao,preco,custo from produtos where codigo_barra=$1';
        const result= await pool.query(query,[codigo]);

        if (result.rows.length===0) {
            return res.status(404).json({
                sucesso:false,
                mensagem:'Nenhum produto encontrado com esse código'
            });
        }

        res.json({
            sucesso:true,
            produto:result.rows[0],
        }); 
    } catch (error) {
        console.error('Erro ao consultar Lucro de Produto:', error);
        res.status(500).json({ 
            sucesso: false, 
            mensagem: 'Erro interno do servidor' 
        });
    }
})

const obterIP = () => {
    const interfaces = os.networkInterfaces();
    for (let nomeInterface in interfaces) {
        for (let info of interfaces[nomeInterface]) {
            if (info.family === 'IPv4' && !info.internal) return info.address;
        }
    }
    return 'localhost';
};

const ip = obterIP();

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://${ip}:${port}`);
});