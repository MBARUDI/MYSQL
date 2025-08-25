--Criar banco de dados
CREATE DATABASE escola;

--cRIAR TABELA COM COLUNAS
CREATE TABLE estudante (
    id INT(10) PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60) NOT NULL,
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    
);

--INSERIR DADOS NA TABELA (CREATE)
INSERT INTO estudante (nome, email, senha) VALUES
('João Silva', 'joaosilva@gmail.com', 'senha123'),
('Maria Santos', 'mariasantos@gmail.com', 'senha456'),
('Pedro Oliveira', 'pedrooliveira@gmail.com', 'senha789');

--CONSULTAR DADOS NA TABELA (READ)
SELECT * FROM estudante;

--selecionar apenas nome e email
SELECT nome, email FROM estudante;

--atualizar dados na tabela (UPDATE)
UPDATE estudante SET email = 'joaosilva@gmail.com' WHERE id = 1;

--deletar dados na tabela (DELETE)
DELETE FROM estudante WHERE id = 3;


