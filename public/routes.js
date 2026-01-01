// =========================================================
// RUTAS API - LOVE&SEX V3
// Módulo de rutas para Express
// =========================================================

const pool = require('../core/db');
const express = require('express');
const router = express.Router();

// =========== RUTAS DE LECTURA DE DATOS ===========

// Obtener todos los usuarios
router.get('/api/users', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT id, username, email, full_name, role, status, created_at FROM users');
        connection.release();
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error('❌ Error al obtener usuarios:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Obtener todas las categorías
router.get('/api/categories', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT id, name, description, status FROM categories WHERE status = "active"');
        connection.release();
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error('❌ Error al obtener categorías:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Obtener todos los productos con categoría
router.get('/api/products', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(
            `SELECT p.id, p.sku, p.name, p.price, p.price_promo, p.stock, 
                    p.image_url, p.is_top_seller, c.name as category 
             FROM products p 
             LEFT JOIN categories c ON p.category_id = c.id 
             WHERE p.status = 'active'
             ORDER BY p.is_top_seller DESC, p.name ASC`
        );
        connection.release();
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error('❌ Error al obtener productos:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Obtener productos por categoría
router.get('/api/products/category/:categoryId', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(
            `SELECT p.id, p.sku, p.name, p.price, p.price_promo, p.stock, 
                    p.image_url, p.is_top_seller, c.name as category 
             FROM products p 
             LEFT JOIN categories c ON p.category_id = c.id 
             WHERE p.category_id = ? AND p.status = 'active'
             ORDER BY p.is_top_seller DESC, p.name ASC`,
            [req.params.categoryId]
        );
        connection.release();
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error('❌ Error al obtener productos por categoría:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Obtener producto por SKU
router.get('/api/products/sku/:sku', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(
            `SELECT p.id, p.sku, p.name, p.slug, p.description, p.price, 
                    p.price_promo, p.stock, p.image_url, p.is_top_seller, 
                    c.name as category 
             FROM products p 
             LEFT JOIN categories c ON p.category_id = c.id 
             WHERE p.sku = ? AND p.status = 'active'`,
            [req.params.sku]
        );
        connection.release();
        if (rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }
        res.json({ success: true, data: rows[0] });
    } catch (error) {
        console.error('❌ Error al obtener producto:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
