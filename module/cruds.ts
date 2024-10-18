const express = require('express');
const mysql2 = require('mysql2/promise');
import { Application } from 'express';
import { Connection, RowDataPacket } from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2/promise';
import UserCRUD from './User/User';

export default function InitCRUDS( app:Application ){
    // Configura a conexão com o banco de dados
    const connectionConfig = {
        host: 'localhost',
        user: 'root',
        password: 'root', // substitua pela sua senha
        database: 'crudtypescript'    // substitua pelo nome do seu banco de dados
    };

    // Função para conectar ao banco de dados
    async function getConnection(): Promise<Connection> {
        return await mysql2.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'crudtypescript',
        });
    }

    // Exemplo de uso no seu servidor
    UserCRUD(app, getConnection);

}