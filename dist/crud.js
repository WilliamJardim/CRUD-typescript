"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const mysql2 = require('mysql2/promise');
const app = express();
app.use(express.json()); // Middleware para interpretar JSON
// Configura a conexão com o banco de dados
const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root', // substitua pela sua senha
    database: 'crudtypescript' // substitua pelo nome do seu banco de dados
};
// Função para conectar ao banco de dados
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield mysql2.createConnection(connectionConfig);
    });
}
// Função para criar um usuário
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    try {
        const connection = yield connect();
        const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
        yield connection.execute(sql, [name, email]);
        yield connection.end();
        res.status(201).send('Usuário criado com sucesso!');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Erro ao criar o usuário.');
    }
}));
// Função para ler todos os usuários
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield connect();
        const [rows] = yield connection.query('SELECT * FROM users');
        yield connection.end();
        res.status(200).json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter os usuários.');
    }
}));
// Função para ler um único registro pelo ID
app.get('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const connection = yield connect();
        const [rows] = yield connection.query('SELECT * FROM users WHERE id = ?', [id]);
        yield connection.end();
        if (rows.length > 0) { // rows terá a propriedade length agora
            res.status(200).json(rows[0]);
        }
        else {
            res.status(404).send('Usuário não encontrado.');
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter o usuário.');
    }
}));
// Função para atualizar um usuário
app.put('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const connection = yield connect();
        const [result] = yield connection.execute('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
        yield connection.end();
        if (result.affectedRows > 0) {
            res.status(200).send('Usuário atualizado com sucesso!');
        }
        else {
            res.status(404).send('Usuário não encontrado.');
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Erro ao atualizar o usuário.');
    }
}));
// Função para deletar um usuário
app.delete('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const connection = yield connect();
        const [result] = yield connection.execute('DELETE FROM users WHERE id = ?', [id]);
        yield connection.end();
        if (result.affectedRows > 0) {
            res.status(200).send('Usuário deletado com sucesso!');
        }
        else {
            res.status(404).send('Usuário não encontrado.');
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Erro ao deletar o usuário.');
    }
}));
// Inicializa o servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
