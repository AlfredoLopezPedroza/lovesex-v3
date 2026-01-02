/**
 * =========================================================
 * LOVE&SEX V3 - SERVIDOR PRINCIPAL
 * Punto de entrada para la aplicación Node.js
 * Desplegado en: https://lightgreen-dog-830375.hostingersite.com/
 * =========================================================
 */

require('dotenv').config();
const express = require('express');
const path = require('path');
const pool = require('./core/db');
const routes = require('./public/routes');

const app = express();
const PORT = process.env.PORT || 3000;

// =========== MIDDLEWARE - ORDEN CRÍTICO ===========
// 1. Parseo de JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Archivos estáticos (DEBE estar ANTES de las rutas dinámicas)
app.use(express.static(path.join(__dirname, 'public')));

// =========== RUTA RAÍZ - ENTREGA TIENDA (SIN ALTERNATIVAS) ===========
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});

// =========== RUTAS DE API ===========
app.use(routes);

// =========== RUTA DE SALUD ===========
app.get('/api/health', async (req, res) => {
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
📊 Base de Datos: ${process.env.DB_NAME} @ ${process.env.DB_HOST}
🌐 API: http://localhost:${PORT}/api/*
🏥 Health: http://localhost:${PORT}/api/health
    `);
});

module.exports = app;
