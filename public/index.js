// =========================================================
// LOVE&SEX V3 - SERVIDOR PRINCIPAL (PUBLIC ENTRY POINT)
// Punto de entrada principal para despliegue en Hostinger
// =========================================================

require('dotenv').config();
const express = require('express');
const path = require('path');
const config = require('../core/config');
const routes = require('./routes');

const app = express();
const PORT = config.server.port;

// =========== MIDDLEWARE ===========
// 1. Parseo de JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Archivos estáticos
// Servir archivos estáticos desde el directorio actual (public)
app.use(express.static(__dirname));
// Servir archivos estáticos desde assets explícitamente si es necesario
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// =========== API ROUTES ===========
// Montar las rutas centralizadas
app.use(routes);

// =========== FRONTEND ROUTES ===========
// Ruta raíz sirve la SPA / Frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Manejo de 404 para API
app.use('/api/*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint no encontrado'
    });
});

// Cualquier otra ruta redirige al index (para SPA o manejo de errores amigable)
// Opcional: Si usamos rutas de frontend tipo /producto/:id en el cliente
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// =========== START SERVER ===========
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`
╔════════════════════════════════════════════╗
║     🏛️  LOVE&SEX V3 - SERVIDOR ACTIVO     ║
╚════════════════════════════════════════════╝
🚀 Puerto: ${PORT}
🌐 Entry Point: public/index.js
        `);
    });
}

module.exports = app;
