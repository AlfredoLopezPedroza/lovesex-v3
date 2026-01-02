/**
 * =========================================================
 * LOVE&SEX V3 - SERVIDOR PRINCIPAL (PUBLIC ENTRY POINT)
 * Punto de entrada para la aplicación Node.js en Hostinger
 * =========================================================
 */

require('dotenv').config();
const express = require('express');
const path = require('path');
const pool = require('../core/db');
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Media = require('../models/Media');

const app = express();
const PORT = process.env.PORT || 3000;

// =========== MIDDLEWARE ===========
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de archivos estáticos
// Sirve archivos desde la raíz de 'public'
app.use(express.static(__dirname));

// =========== RUTAS API ===========

// Obtener todos los usuarios
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json({ success: true, data: users });
    } catch (error) {
        console.error('❌ Error al obtener usuarios:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Obtener todas las categorías
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await Category.findAllActive();
        res.json({ success: true, data: categories });
    } catch (error) {
        console.error('❌ Error al obtener categorías:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Obtener todos los productos con categoría
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json({ success: true, data: products });
    } catch (error) {
        console.error('❌ Error al obtener productos:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Obtener productos por categoría
app.get('/api/products/category/:categoryId', async (req, res) => {
    try {
        const products = await Product.findByCategory(req.params.categoryId);
        res.json({ success: true, data: products });
    } catch (error) {
        console.error('❌ Error al obtener productos por categoría:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Obtener producto por SKU
app.get('/api/products/sku/:sku', async (req, res) => {
    try {
        const product = await Product.findBySku(req.params.sku);
        if (!product) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }
        res.json({ success: true, data: product });
    } catch (error) {
        console.error('❌ Error al obtener producto:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Obtener inventario (media/archivos)
app.get('/api/media', async (req, res) => {
    try {
        const media = await Media.findAll();
        res.json({ success: true, data: media });
    } catch (error) {
        console.error('❌ Error al obtener media:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Ruta de salud (health check)
app.get('/api/health', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        await connection.ping();
        connection.release();
        res.json({ status: '✅ Servidor activo', db: '✅ Base de datos conectada' });
    } catch (error) {
        res.status(503).json({ status: '❌ Error', db: '❌ Base de datos desconectada', error: error.message });
    }
});

// =========== RUTA BASE ===========
// Cualquier ruta no capturada por API se maneja aquí (SPA o archivo estático)
app.get('*', (req, res) => {
    // Si existe index.html en views, servirlo, sino enviar mensaje
    const indexPath = path.join(__dirname, 'views', 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            // Fallback si no hay index.html
            res.send('🏛️ Love&Sex v3: Servidor Node.js Activo y Conectado (API Ready)');
        }
    });
});

// =========== INICIAR SERVIDOR ===========
// Solo iniciamos el servidor si este archivo se ejecuta directamente
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor Node.js (Public) escuchando en el puerto ${PORT}`);
        console.log(`📊 API disponible en http://localhost:${PORT}/api/*`);
    });
}

module.exports = app;
