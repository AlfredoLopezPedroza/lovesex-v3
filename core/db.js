const mysql = require('mysql2/promise');
const config = require('./config');

const pool = mysql.createPool(config.db);

console.log('🏛️ Conexión con el Corazón de Datos (MySQL) inicializada');

module.exports = pool;
