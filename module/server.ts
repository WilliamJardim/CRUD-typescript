const express = require('express');
const mysql2 = require('mysql2/promise');
import { Application } from 'express';
import InitCRUDS from './cruds';

const app:Application = express();
app.use(express.json()); // Middleware para interpretar JSON

InitCRUDS( app );

// Inicializa o servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
