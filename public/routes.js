// =========================================================
// RUTAS API - LOVE&SEX V3
// Módulo de rutas para Express
// Optimizado para tabla: productos (español)
// =========================================================

const pool = require('../core/db');
const express = require('express');
const router = express.Router();

// =========================================================
// GET /api/users - Obtener todos los usuarios
// =========================================================
router.get('/api/users', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        // Assuming table name is 'users' or 'usuarios' - checking original index.js logic it was 'users'
        // But since we are migrating to Spanish schema 'productos', maybe users is 'usuarios'?
        // db.sql or similar might tell. I'll stick to 'users' if it fails I'll fix.
        // Wait, I should verify table name first.
        const [rows] = await connection.query('SELECT id, username, email, full_name, role, status, created_at FROM users');

        res.json({ success: true, data: rows });
    } catch (error) {
        console.error('❌ Error al obtener usuarios:', error);
        res.status(500).json({ success: false, error: error.message });
    } finally {
        if (connection) connection.release();
    }
});

// =========================================================
// GET /api/media - Obtener inventario (media/archivos)
// =========================================================
router.get('/api/media', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT id, filename, file_path, file_type, uploaded_at FROM media');
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error('❌ Error al obtener media:', error);
        res.status(500).json({ success: false, error: error.message });
    } finally {
        if (connection) connection.release();
    }
});

// =========================================================
// GET /api/products - Obtener todos los productos
// =========================================================
router.get('/api/products', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        
        // Query para tabla 'productos' con alias de categoría
        const [rows] = await connection.query(`
            SELECT 
                p.id,
                p.sku,
                p.nombre as name,
                p.descripcion as description,
                p.precio as price,
                p.precio_promocion as price_promo,
                p.existencia as stock,
                p.imagen as image_url,
                p.destacado as is_top_seller,
                c.nombre as category,
                c.alias as category_slug
            FROM productos p
            LEFT JOIN categorias c ON p.categoria_id = c.id
            WHERE p.estado = 'activo'
            ORDER BY p.destacado DESC, p.nombre ASC
        `);
        
        console.log(`✅ API /products: Retornando ${rows.length} productos`);
        
        res.json({ 
            success: true, 
            data: rows,
            count: rows.length
        });
        
    } catch (error) {
        console.error('❌ Error en /api/products:', error.message);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    } finally {
        if (connection) connection.release();
    }
});

// =========================================================
// GET /api/categories - Obtener todas las categorías
// =========================================================
router.get('/api/categories', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        
        const [rows] = await connection.query(`
            SELECT 
                id,
                nombre as name,
                alias,
                descripcion as description,
                estado as status
            FROM categorias
            WHERE estado = 'activo'
            ORDER BY nombre ASC
        `);
        
        console.log(`✅ API /categories: Retornando ${rows.length} categorías`);
        
        res.json({ 
            success: true, 
            data: rows,
            count: rows.length
        });
        
    } catch (error) {
        console.error('❌ Error en /api/categories:', error.message);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    } finally {
        if (connection) connection.release();
    }
});

// =========================================================
// GET /api/products/category/:categoryId - Productos por categoría
// =========================================================
router.get('/api/products/category/:categoryId', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        
        const [rows] = await connection.query(`
            SELECT 
                p.id,
                p.sku,
                p.nombre as name,
                p.descripcion as description,
                p.precio as price,
                p.precio_promocion as price_promo,
                p.existencia as stock,
                p.imagen as image_url,
                p.destacado as is_top_seller,
                c.nombre as category,
                c.alias as category_slug
            FROM productos p
            LEFT JOIN categorias c ON p.categoria_id = c.id
            WHERE p.categoria_id = ? AND p.estado = 'activo'
            ORDER BY p.destacado DESC, p.nombre ASC
        `, [req.params.categoryId]);
        
        console.log(`✅ API /products/category/${req.params.categoryId}: Retornando ${rows.length} productos`);
        
        res.json({ 
            success: true, 
            data: rows,
            count: rows.length
        });
        
    } catch (error) {
        console.error('❌ Error en /api/products/category:', error.message);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    } finally {
        if (connection) connection.release();
    }
});

// =========================================================
// GET /api/products/sku/:sku - Obtener producto por SKU
// =========================================================
router.get('/api/products/sku/:sku', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        
        const [rows] = await connection.query(`
            SELECT 
                p.id,
                p.sku,
                p.nombre as name,
                p.descripcion as description,
                p.precio as price,
                p.precio_promocion as price_promo,
                p.existencia as stock,
                p.imagen as image_url,
                p.destacado as is_top_seller,
                c.nombre as category,
                c.alias as category_slug
            FROM productos p
            LEFT JOIN categorias c ON p.categoria_id = c.id
            WHERE p.sku = ? AND p.estado = 'activo'
        `, [req.params.sku.toUpperCase()]);
        
        if (rows.length === 0) {
            return res.status(404).json({ 
                success: false, 
                error: 'Producto no encontrado'
            });
        }
        
        console.log(`✅ API /products/sku/${req.params.sku}: Producto encontrado`);
        
        res.json({ 
            success: true, 
            data: rows[0]
        });
        
    } catch (error) {
        console.error('❌ Error en /api/products/sku:', error.message);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    } finally {
        if (connection) connection.release();
    }
});

// =========================================================
// GET /api/health - Health check
// =========================================================
router.get('/api/health', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.ping();
        
        res.json({ 
            success: true,
            status: 'API Operacional',
            db: 'Conectado',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(503).json({ 
            success: false,
            status: 'Error',
            db: 'Desconectado',
            error: error.message
        });
    } finally {
        if (connection) connection.release();
    }
});

module.exports = router;
