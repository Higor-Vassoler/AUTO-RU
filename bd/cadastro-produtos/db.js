const path = require("path");
// Garante que o dotenv ache o arquivo .env na mesma pasta deste arquivo db.js
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const mysql = require("mysql2/promise");

// Configuração do pool de conexões com o MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, // Altere para o seu usuário do MySQL
  password: process.env.DB_PASS, // Altere para a sua senha do MySQL
  database: process.env.DB_NAME, // Altere para o nome do banco do Auto RU
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
