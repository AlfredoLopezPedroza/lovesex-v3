/**
 * =========================================================
 * LOVE&SEX V3 - SERVIDOR PRINCIPAL
 * Punto de entrada para la aplicación Node.js
 * =========================================================
 */

const config = require('../core/config'); // Load config (and dotenv)
const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();
const PORT = config.port;

// =========== MIDDLEWARE - ORDEN CRÍTICO ===========
// 1. Parseo de JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Archivos estáticos
// Servir assets específicamente para evitar exponer código fuente (index.js, routes.js)
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/views', express.static(path.join(__dirname, 'views')));
app.use('/includes', express.static(path.join(__dirname, 'includes')));

// =========== RUTA RAÍZ - ENTREGA TIENDA ===========
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// =========== RUTAS DE API ===========
app.use(routes);

// =========== MANEJO DE ERRORES 404 ===========
app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        path: req.path,
        method: req.method
    });
});

// =========== INICIAR SERVIDOR ===========
// Only listen if this file is run directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`
╔════════════════════════════════════════════╗
║     🏛️  LOVE&SEX V3 - SERVIDOR ACTIVO     ║
╚════════════════════════════════════════════╝
🚀 Puerto: ${PORT}
🌐 API: http://localhost:${PORT}/api/*
        `);
    });
}

module.exports = app;
