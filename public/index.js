/**
 * =========================================================
 * LOVE&SEX V3 - SERVIDOR PRINCIPAL (PUBLIC ENTRY POINT)
 * Punto de entrada para Hostinger y despliegue Node.js
 * =========================================================
 */

require('dotenv').config();
const express = require('express');
const path = require('path');
const config = require('../core/config');
const routes = require('./routes');
const pool = require('../core/db'); // Mantener para health check directo si es necesario o logging

const app = express();
const PORT = config.server.port;

// =========== MIDDLEWARE ===========

// 1. Parseo de JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Archivos estáticos
// Servir archivos desde el directorio actual (public)
app.use(express.static(__dirname));

// =========== RUTAS ===========

// API Routes
app.use(routes);

// Ruta Raíz - Si no coincide con un archivo estático, servir index.html o mensaje
app.get('/', (req, res) => {
    // Intentar servir index.html si existe, si no, un mensaje
    const indexPath = path.join(__dirname, 'views', 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
             // Fallback si no existe la vista
            res.send('🏛️ Love&Sex v3: Servidor Node.js Activo. Acceda a /api/products para datos.');
        }
    });
});

// Ruta de Salud (Health Check) - Redundante si está en routes.js, pero buena práctica tenerlo explícito en el entry
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});


// =========== MANEJO DE ERRORES ===========

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Recurso no encontrado',
        path: req.path
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════╗
║     🏛️  LOVE&SEX V3 - PUBLIC SERVER       ║
╚════════════════════════════════════════════╝
🚀 Puerto: ${PORT}
📂 Root: ${__dirname}
    `);
});

module.exports = app;
