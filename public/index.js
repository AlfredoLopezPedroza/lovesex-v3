/**
 * =========================================================
 * LOVE&SEX V3 - SERVIDOR PRINCIPAL
 * Punto de entrada para la aplicación Node.js
 * =========================================================
 */

const express = require('express');
const path = require('path');
const config = require('../core/config');
const pool = require('../core/db');
const routes = require('./routes');

const app = express();
const PORT = config.app.port;

// =========== MIDDLEWARE - ORDEN CRÍTICO ===========
// 1. Parseo de JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Archivos estáticos
// Servimos el contenido de public desde la raíz
app.use(express.static(__dirname));

// =========== RUTA RAÍZ - ENTREGA TIENDA ===========
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// =========== RUTAS DE API ===========
app.use(routes);

// =========== RUTA DE SALUD (ADICIONAL A LA DE ROUTES) ===========
app.get('/health', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        await connection.ping();
        connection.release();
        res.json({
            status: '✅ Servidor activo',
            db: '✅ Base de datos conectada',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(503).json({
            status: '❌ Error',
            db: '❌ Base de datos desconectada',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
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
