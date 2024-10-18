const mysql2 = require('mysql2/promise'); // Use mysql2/promise para usar a versão com Promises
import {Connection} from 'mysql2/promise'; // Importe os tipos manualmente

// Configura a conexão com o banco de dados
const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root', // substitua pela sua senha
    database: 'test_db'    // substitua pelo nome do seu banco de dados
};

// Função para conectar ao banco de dados
async function connect(): Promise<Connection> {  // Usar Connection como o tipo de retorno
    return await mysql2.createConnection(connectionConfig);
}

// Função para criar um registro
async function createUser(name: string, email: string): Promise<void> {
    const connection = await connect();
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    await connection.execute(sql, [name, email]);
    await connection.end();
    console.log('Usuário criado com sucesso!');
}

// Função para ler todos os registros
async function readUsers(): Promise<void> {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM users');
    console.log(rows);
    await connection.end();
}

// Função para ler um único registro pelo ID
async function readUserById(id: number): Promise<void> {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
    console.log(rows);
    await connection.end();
}

// Função para atualizar um registro
async function updateUser(id: number, name: string, email: string): Promise<void> {
    const connection = await connect();
    const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    await connection.execute(sql, [name, email, id]);
    await connection.end();
    console.log('Usuário atualizado com sucesso!');
}

// Função para deletar um registro
async function deleteUser(id: number): Promise<void> {
    const connection = await connect();
    const sql = 'DELETE FROM users WHERE id = ?';
    await connection.execute(sql, [id]);
    await connection.end();
    console.log('Usuário deletado com sucesso!');
}

// Exemplo de uso
async function main() {
    // Cria um usuário
    await createUser('John Doe', 'john@example.com');
    
    // Lê todos os usuários
    await readUsers();
    
    // Lê um usuário por ID
    await readUserById(1);
    
    // Atualiza o usuário com ID 1
    await updateUser(1, 'Jane Doe', 'jane@example.com');
    
    // Deleta o usuário com ID 1
    await deleteUser(1);
}

// Executa a função principal
main().catch(console.error);
