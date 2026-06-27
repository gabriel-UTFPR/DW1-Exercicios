drop table if exists fornecedores,clientes,produtos,pedidos;
CREATE TABLE fornecedores (
    cnpj CHAR(14) PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    tipo VARCHAR(100) NOT NULL
);

CREATE TABLE clientes (
    cpf CHAR(11) PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    telefone VARCHAR(15) NOT NULL unique
);

CREATE TABLE produtos (
    codigo_barra VARCHAR(13) PRIMARY KEY,
    preco NUMERIC(10,2) NOT NULL,
    descricao VARCHAR(300) NOT NULL UNIQUE,
    tipo VARCHAR(100) NOT NULL,
    estoque_atual INTEGER NOT NULL,
    estoque_minimo INTEGER NOT NULL,
    estoque_maximo INTEGER NOT NULL,
    custo NUMERIC(10,2) NOT NULL,
    cnpj_fornecedor VARCHAR(14) NOT NULL,

    FOREIGN KEY (cnpj_fornecedor)
	REFERENCES fornecedores(cnpj),

    CONSTRAINT preco_custo 
        CHECK (preco > custo)
);

CREATE TABLE pedidos (
    num_pedido INTEGER NOT NULL,
    data_pedido DATE NOT NULL,
    cpf_cliente CHAR(11) NOT NULL,
    quantidade INTEGER NOT NULL,
    codigo_produto VARCHAR(13) NOT NULL,

    FOREIGN KEY (cpf_cliente) REFERENCES clientes(cpf),
    FOREIGN KEY (codigo_produto) REFERENCES produtos(codigo_barra),

    PRIMARY KEY (num_pedido, codigo_produto)
);

--fornecedores
INSERT INTO fornecedores (cnpj, nome, tipo) VALUES

-- Perecíveis
('10000000000101', 'BRF S.A.', 'Perecíveis'),
('10000000000102', 'JBS S.A.', 'Perecíveis'),
('10000000000103', 'Maria Macia Cooperativa Mista Agropecuária', 'Carnes'),

-- Bebidas
('10000000000201', 'Ambev S.A.', 'Bebidas'),
('10000000000202', 'The Coca-Cola Company Brasil', 'Bebidas'),

-- Hortifruti
('10000000000301', 'CEASA Paraná Distribuição', 'Hortifruti'),
('10000000000302', 'Hortifruti Natural da Terra', 'Hortifruti'),

-- Secos
('10000000000401', 'Nestlé Brasil', 'Secos'),
('10000000000402', 'M. Dias Branco S.A.', 'Secos'),

-- Higiene Pessoal
('10000000000501', 'Unilever Brasil', 'Higiene Pessoal'),
('10000000000502', 'Procter & Gamble Brasil', 'Higiene Pessoal'),

-- Limpeza
('10000000000601', 'Reckitt Benckiser Brasil', 'Limpeza'),
('10000000000602', 'Bombril S.A.', 'Limpeza'),

-- Pet
('10000000000701', 'Nestlé Purina PetCare', 'Pet'),
('10000000000702', 'Mars Petcare Brasil', 'Pet');

--Clientes

INSERT INTO clientes (cpf, nome, telefone) VALUES
('11122233344', 'Gabriel Silva', '44991234567'),
('22233344455', 'Ana Souza', '44998765432'),
('33344455566', 'Carlos Oliveira', '44999887766'),
('44455566677', 'Mariana Lima', '44997654321'),
('55566677788', 'João Pereira', '44995554433'),
('66677788899', 'Fernanda Costa', '44994443322'),
('77788899900', 'Lucas Martins', '44993332211'),
('88899900011', 'Juliana Rodrigues', '44992221100'),
('99900011122', 'Rafael Almeida', '44991110099'),
('12345678901', 'Patrícia Gomes', '44990098877'),
('23456789012', 'Eduardo Santos', '44998877665'),
('45678901234', 'Radames Halmeman', '44996655443');

--Produtos
INSERT INTO produtos (
    codigo_barra,
    preco,
    descricao,
    tipo,
    estoque_atual,
    estoque_minimo,
    estoque_maximo,
    custo,
    cnpj_fornecedor
) VALUES

-- BRF S.A.
('7891000000001', 12.90, 'Leite Integral BRF 1L', 'Laticínios', 15, 20, 150, 8.50, '10000000000101'),
('7891000000002', 18.90, 'Iogurte Natural BRF 900g', 'Laticínios', 50, 10, 100, 12.00, '10000000000101'),
('7891000000003', 24.90, 'Queijo Mussarela BRF 500g', 'Laticínios', 40, 10, 80, 17.00, '10000000000101'),

-- JBS S.A.
('7891000000004', 39.90, 'Picanha Bovina JBS 1kg', 'Carnes', 30, 10, 60, 28.00, '10000000000102'),
('7891000000005', 22.90, 'Linguiça Toscana JBS 1kg', 'Carnes', 45, 10, 90, 15.00, '10000000000102'),
('7891000000006', 16.90, 'Hambúrguer Bovino JBS 672g', 'Carnes', 50, 15, 100, 11.00, '10000000000102'),

-- Maria Macia Cooperativa Mista Agropecuária
('7891000000007', 34.90, 'Contra Filé Bovino 1kg', 'Carnes', 35, 10, 70, 25.00, '10000000000103'),
('7891000000008', 29.90, 'Costela Bovina 1kg', 'Carnes', 40, 10, 80, 20.00, '10000000000103'),
('7891000000009', 18.90, 'Carne Moída Bovina 1kg', 'Carnes', 50, 15, 100, 12.00, '10000000000103'),

-- Ambev
('7891000000010', 4.50, 'Guaraná Antarctica 350ml', 'Bebidas', 150, 30, 300, 2.20, '10000000000201'),
('7891000000011', 3.90, 'Pepsi 350ml', 'Bebidas', 120, 20, 250, 1.90, '10000000000201'),
('7891000000012', 5.50, 'Sukita Laranja 2L', 'Bebidas', 100, 20, 200, 3.00, '10000000000201'),

-- Coca-Cola
('7891000000013', 8.99, 'Coca-Cola 2L', 'Bebidas', 100, 20, 200, 5.50, '10000000000202'),
('7891000000014', 3.99, 'Fanta Laranja 350ml', 'Bebidas', 140, 25, 280, 2.10, '10000000000202'),
('7891000000015', 3.99, 'Sprite 350ml', 'Bebidas', 130, 20, 260, 2.10, '10000000000202'),

-- CEASA Paraná Distribuição
('7891000000016', 6.99, 'Banana Prata 1kg', 'Hortifruti', 60, 15, 120, 3.50, '10000000000301'),
('7891000000017', 5.49, 'Tomate 1kg', 'Hortifruti', 80, 20, 160, 2.80, '10000000000301'),
('7891000000018', 4.99, 'Batata Inglesa 1kg', 'Hortifruti', 90, 20, 180, 2.50, '10000000000301'),

-- Hortifruti Natural da Terra
('7891000000019', 9.99, 'Maçã Gala 1kg', 'Hortifruti', 50, 10, 100, 5.00, '10000000000302'),
('7891000000020', 7.99, 'Pera Williams 1kg', 'Hortifruti', 45, 10, 90, 4.20, '10000000000302'),
('7891000000021', 6.50, 'Laranja Pera 1kg', 'Hortifruti', 70, 15, 140, 3.20, '10000000000302'),

-- Nestlé Brasil
('7891000000022', 29.90, 'Nescau 800g', 'Secos', 70, 15, 150, 20.00, '10000000000401'),
('7891000000023', 14.90, 'Leite Ninho 380g', 'Secos', 60, 15, 120, 9.50, '10000000000401'),
('7891000000024', 6.90, 'Biscoito Passatempo', 'Secos', 100, 20, 200, 3.50, '10000000000401'),

-- M. Dias Branco
('7891000000025', 6.49, 'Macarrão Espaguete 500g', 'Secos', 120, 20, 250, 3.20, '10000000000402'),
('7891000000026', 5.90, 'Biscoito Cream Cracker', 'Secos', 100, 20, 200, 3.00, '10000000000402'),
('7891000000027', 7.90, 'Farinha de Trigo 1kg', 'Secos', 90, 20, 180, 4.20, '10000000000402'),

-- Unilever
('7891000000028', 7.99, 'Sabonete Dove 90g', 'Higiene Pessoal', 90, 20, 180, 4.30, '10000000000501'),
('7891000000029', 12.90, 'Desodorante Rexona', 'Higiene Pessoal', 70, 15, 140, 7.00, '10000000000501'),
('7891000000030', 9.90, 'Creme Dental Close Up', 'Higiene Pessoal', 80, 20, 160, 5.00, '10000000000501'),

-- Procter & Gamble
('7891000000031', 14.90, 'Shampoo Pantene 350ml', 'Higiene Pessoal', 50, 10, 100, 9.00, '10000000000502'),
('7891000000032', 13.50, 'Condicionador Pantene 350ml', 'Higiene Pessoal', 45, 10, 90, 8.00, '10000000000502'),
('7891000000033', 10.90, 'Prestobarba Gillette', 'Higiene Pessoal', 60, 15, 120, 6.00, '10000000000502'),

-- Reckitt Benckiser
('7891000000034', 12.50, 'Veja Multiuso 500ml', 'Limpeza', 80, 15, 160, 7.00, '10000000000601'),
('7891000000035', 8.90, 'Lysol Desinfetante', 'Limpeza', 70, 15, 140, 5.00, '10000000000601'),
('7891000000036', 6.90, 'Harpic Sanitário', 'Limpeza', 75, 15, 150, 4.00, '10000000000601'),

-- Bombril
('7891000000037', 3.99, 'Detergente Líquido 500ml', 'Limpeza', 140, 30, 300, 2.00, '10000000000602'),
('7891000000038', 2.99, 'Esponja Bombril', 'Limpeza', 200, 50, 400, 1.20, '10000000000602'),
('7891000000039', 5.90, 'Sapólio Radium', 'Limpeza', 90, 20, 180, 3.00, '10000000000602'),

-- Nestlé Purina PetCare
('7891000000040', 24.90, 'Ração Purina Dog Chow 1kg', 'Pet', 60, 10, 120, 15.00, '10000000000701'),
('7891000000041', 26.90, 'Ração Purina Cat Chow 1kg', 'Pet', 50, 10, 100, 16.00, '10000000000701'),
('7891000000042', 8.90, 'Petisco Purina Friskies', 'Pet', 70, 15, 140, 4.50, '10000000000701'),

-- Mars Petcare Brasil
('7891000000043', 22.90, 'Ração Pedigree 1kg', 'Pet', 60, 10, 120, 14.00, '10000000000702'),
('7891000000044', 24.90, 'Ração Whiskas 1kg', 'Pet', 55, 10, 110, 15.00, '10000000000702'),
('7891000000045', 7.90, 'Petisco Pedigree Biscrok', 'Pet', 80, 20, 160, 4.00, '10000000000702');

--pedidos

INSERT INTO pedidos (num_pedido, data_pedido, cpf_cliente, quantidade, codigo_produto) VALUES

(1, '2026-06-10', '11122233344', 2, '7891000000001'),
(1, '2026-06-10', '11122233344', 1, '7891000000013'),

(2, '2026-06-11', '22233344455', 3, '7891000000016'),
(2, '2026-06-11', '22233344455', 2, '7891000000025'),

(3, '2026-06-12', '33344455566', 1, '7891000000004'),
(3, '2026-06-12', '33344455566', 2, '7891000000031'),

(4, '2026-06-13', '44455566677', 2, '7891000000022'),
(4, '2026-06-13', '44455566677', 1, '7891000000034'),

(5, '2026-06-14', '55566677788', 4, '7891000000010'),
(5, '2026-06-14', '55566677788', 2, '7891000000037'),

(6, '2026-06-15', '66677788899', 1, '7891000000019'),
(6, '2026-06-15', '66677788899', 3, '7891000000040'),

(7, '2026-06-16', '77788899900', 2, '7891000000007'),
(7, '2026-06-16', '77788899900', 1, '7891000000035'),

(8, '2026-06-17', '88899900011', 3, '7891000000028'),
(8, '2026-06-17', '88899900011', 2, '7891000000043'),

(9, '2026-06-18', '99900011122', 1, '7891000000005'),
(9, '2026-06-18', '99900011122', 2, '7891000000020'),

(10, '2026-06-19', '12345678901', 2, '7891000000014'),
(10, '2026-06-19', '12345678901', 1, '7891000000039');

