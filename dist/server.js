"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cors = require('cors');
const cruds_1 = require("./cruds");
const app = express();
// Configuração básica para permitir todas as origens
app.use(cors());
app.use(express.json()); // Middleware para interpretar JSON
(0, cruds_1.default)(app);
// Inicializa o servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
