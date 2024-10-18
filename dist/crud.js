var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mysql2 = require('mysql2/promise'); // Use mysql2/promise para usar a versão com Promises
// Configura a conexão com o banco de dados
const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: 'password', // substitua pela sua senha
    database: 'test_db' // substitua pelo nome do seu banco de dados
};
// Função para conectar ao banco de dados
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield mysql2.createConnection(connectionConfig);
    });
}
// Função para criar um registro
function createUser(name, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield connect();
        const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
        yield connection.execute(sql, [name, email]);
        yield connection.end();
        console.log('Usuário criado com sucesso!');
    });
}
// Função para ler todos os registros
function readUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield connect();
        const [rows] = yield connection.query('SELECT * FROM users');
        console.log(rows);
        yield connection.end();
    });
}
// Função para ler um único registro pelo ID
function readUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield connect();
        const [rows] = yield connection.query('SELECT * FROM users WHERE id = ?', [id]);
        console.log(rows);
        yield connection.end();
    });
}
// Função para atualizar um registro
function updateUser(id, name, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield connect();
        const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
        yield connection.execute(sql, [name, email, id]);
        yield connection.end();
        console.log('Usuário atualizado com sucesso!');
    });
}
// Função para deletar um registro
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield connect();
        const sql = 'DELETE FROM users WHERE id = ?';
        yield connection.execute(sql, [id]);
        yield connection.end();
        console.log('Usuário deletado com sucesso!');
    });
}
// Exemplo de uso
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Cria um usuário
        yield createUser('John Doe', 'john@example.com');
        // Lê todos os usuários
        yield readUsers();
        // Lê um usuário por ID
        yield readUserById(1);
        // Atualiza o usuário com ID 1
        yield updateUser(1, 'Jane Doe', 'jane@example.com');
        // Deleta o usuário com ID 1
        yield deleteUser(1);
    });
}
// Executa a função principal
main().catch(console.error);
export {};
