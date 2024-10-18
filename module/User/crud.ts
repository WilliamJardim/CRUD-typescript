const express = require('express');
const mysql2 = require('mysql2/promise');
import { Connection, RowDataPacket } from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2/promise';

const app = express();
app.use(express.json()); // Middleware para interpretar JSON

// Configura a conexão com o banco de dados
const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root', // substitua pela sua senha
    database: 'crudtypescript'    // substitua pelo nome do seu banco de dados
};

// Função para conectar ao banco de dados
async function connect(): Promise<Connection> {
    return await mysql2.createConnection(connectionConfig);
}

// Função para criar um usuário
app.post('/users', async (req, res) => {
    const { name, email } = req.query;
    
    try {
        const connection = await connect();
        const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
        
        console.log( name, email );

        await connection.execute(sql, [name, email]);
        await connection.end();
        res.status(201).send('Usuário criado com sucesso!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao criar o usuário.');
    }
});

// Função para ler todos os usuários
app.get('/users', async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.query('SELECT * FROM users');
        await connection.end();
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter os usuários.');
    }
});

// Função para ler um único registro pelo ID
app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await connect();
        const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [id]);
        await connection.end();
        if (rows.length > 0) {  // rows terá a propriedade length agora
            res.status(200).json(rows[0]);
        } else {
            res.status(404).send('Usuário não encontrado.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter o usuário.');
    }
});

// Função para atualizar um usuário
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const connection = await connect();
        const [result] = await connection.execute<ResultSetHeader>('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
        await connection.end();
        if (result.affectedRows > 0) {
            res.status(200).send('Usuário atualizado com sucesso!');
        } else {
            res.status(404).send('Usuário não encontrado.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao atualizar o usuário.');
    }
});

// Função para deletar um usuário
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await connect();
        const [result] = await connection.execute<ResultSetHeader>('DELETE FROM users WHERE id = ?', [id]);
        await connection.end();
        if (result.affectedRows > 0) {
            res.status(200).send('Usuário deletado com sucesso!');
        } else {
            res.status(404).send('Usuário não encontrado.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao deletar o usuário.');
    }
});

// Inicializa o servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
