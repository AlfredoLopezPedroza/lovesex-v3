/**
 * =========================================================
 * LOVE&SEX V3 - SERVIDOR PRINCIPAL
 * Punto de entrada para la aplicación Node.js
 * =========================================================
 */

const express = require('express');
const path = require('path');
const config = require('../core/config');
const routes = require('./routes');
const pool = require('../core/db');

const app = express();
const PORT = config.server.port;

// =========== MIDDLEWARE ===========
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========== ARCHIVOS ESTÁTICOS ===========
// Servir archivos estáticos desde la carpeta public
app.use(express.static(__dirname));

// =========== RUTAS API ===========
app.use(routes);

// =========== RUTA RAÍZ ===========
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
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
📊 Base de Datos: ${config.db.database} @ ${config.db.host}
🌐 API: http://localhost:${PORT}/api/*
    `);
});

module.exports = app;
