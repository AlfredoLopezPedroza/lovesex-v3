require('dotenv').config();
const express = require('express');
const path = require('path');
const config = require('../core/config');
const routes = require('./routes');
const pool = require('../core/db');

const app = express();
const PORT = config.server.port;

// =========== MIDDLEWARE ===========
// 1. Parseo de JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Archivos estáticos
// Sirve archivos desde el directorio actual (public)
app.use(express.static(__dirname));

// =========== RUTAS DE API ===========
// Montamos las rutas definidas en routes.js
app.use(routes);

// =========== RUTA BASE ===========
// Si no es una API ni un estático, intenta servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'), (err) => {
        if (err) {
            // Si index.html no está en views, intentamos en la raíz de public
             res.sendFile(path.join(__dirname, 'index.html'));
        }
    });
});

// =========== MANEJO DE ERRORES 404 ===========
app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        path: req.path,
        method: req.method
    });
});

// =========== INICIAR SERVIDOR ===========
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════╗
║     🏛️  LOVE&SEX V3 - SERVIDOR ACTIVO     ║
╚════════════════════════════════════════════╝
🚀 Puerto: ${PORT}
🌐 Entry Point: public/index.js
    `);
});

module.exports = app;
