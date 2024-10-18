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
exports.default = InitCRUDS;
const express = require('express');
const mysql2 = require('mysql2/promise');
const User_1 = require("./User/User");
function InitCRUDS(app) {
    // Configura a conexão com o banco de dados
    const connectionConfig = {
        host: 'localhost',
        user: 'root',
        password: 'root', // substitua pela sua senha
        database: 'crudtypescript' // substitua pelo nome do seu banco de dados
    };
    // Função para conectar ao banco de dados
    function getConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mysql2.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'root',
                database: 'crudtypescript',
            });
        });
    }
    // Exemplo de uso no seu servidor
    (0, User_1.default)(app, getConnection);
}
