const express = require('express');
const cors = require('cors');
import { Application } from 'express';
import InitCRUDS from './cruds';

const app:Application = express();
// Configuração básica para permitir todas as origens
app.use(cors());

app.use(express.json()); // Middleware para interpretar JSON

InitCRUDS( app );

// Inicializa o servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
