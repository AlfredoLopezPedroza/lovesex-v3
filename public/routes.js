// =========================================================
// RUTAS API - LOVE&SEX V3
// Módulo de rutas para Express
// =========================================================

const pool = require('../core/db');
const express = require('express');
const router = express.Router();

// =========== FUNCIÓN AUXILIAR PARA DETECTAR TABLA ===========
async function getProductsTable(connection) {
    try {
        // Intenta primero con la tabla en inglés
        await connection.query('SELECT 1 FROM products LIMIT 1');
        return 'products';
    } catch {
        try {
            // Si falla, intenta con la tabla en español
            await connection.query('SELECT 1 FROM productos LIMIT 1');
            return 'productos';
        } catch {
            throw new Error('No se encontró tabla de productos (products o productos)');
        }
    }
}

// =========== FUNCIÓN AUXILIAR PARA MAPEAR COLUMNAS ===========
function mapProductColumns(row, tableName) {
    // Normalizar nombres de columnas independientemente de idioma
    return {
        id: row.id || row.ID || row.producto_id || row.id_producto,
        sku: row.sku || row.SKU || row.codigo || row.codigo_producto,
        name: row.name || row.nombre || row.NAME || row.NOMBRE,
        price: row.price || row.precio || row.PRICE || row.PRECIO,
        price_promo: row.price_promo || row.precio_promocion || row.precio_oferta || 0,
        stock: row.stock || row.existencia || row.cantidad || 0,
        image_url: row.image_url || row.imagen || row.url_imagen || 'pendiente.jpg',
        is_top_seller: row.is_top_seller || row.destacado || 0,
        category: row.category || row.categoria || row.CATEGORY || row.CATEGORIA || 'General'
    };
}

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
    let connection;
    try {
        connection = await pool.getConnection();
        const tableName = await getProductsTable(connection);
        
        // Query dinámico según la tabla
        let query;
        if (tableName === 'products') {
            query = `SELECT p.id, p.sku, p.name, p.price, p.price_promo, p.stock, 
                            p.image_url, p.is_top_seller, c.name as category 
                     FROM products p 
                     LEFT JOIN categories c ON p.category_id = c.id 
                     WHERE p.status = 'active'
                     ORDER BY p.is_top_seller DESC, p.name ASC`;
        } else {
            query = `SELECT p.id, p.sku, p.nombre as name, p.precio as price, 
                            p.precio_promocion as price_promo, p.existencia as stock, 
                            p.imagen as image_url, p.destacado as is_top_seller, p.categoria as category 
                     FROM productos p 
                     WHERE p.estado = 'activo' OR p.estado = 'active'
                     ORDER BY p.destacado DESC, p.nombre ASC`;
        }
        
        const [rows] = await connection.query(query);
        const mappedRows = rows.map(row => mapProductColumns(row, tableName));
        
        res.json({ success: true, data: mappedRows });
    } catch (error) {
        console.error('❌ Error al obtener productos:', error);
        res.status(500).json({ success: false, error: error.message });
    } finally {
        if (connection) connection.release();
    }
});

// Obtener productos por categoría
router.get('/api/products/category/:categoryId', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const tableName = await getProductsTable(connection);
        
        let query;
        if (tableName === 'products') {
            query = `SELECT p.id, p.sku, p.name, p.price, p.price_promo, p.stock, 
                            p.image_url, p.is_top_seller, c.name as category 
                     FROM products p 
                     LEFT JOIN categories c ON p.category_id = c.id 
                     WHERE p.category_id = ? AND p.status = 'active'
                     ORDER BY p.is_top_seller DESC, p.name ASC`;
        } else {
            query = `SELECT p.id, p.sku, p.nombre as name, p.precio as price, 
                            p.precio_promocion as price_promo, p.existencia as stock, 
                            p.imagen as image_url, p.destacado as is_top_seller, p.categoria as category 
                     FROM productos p 
                     WHERE p.categoria_id = ? AND (p.estado = 'activo' OR p.estado = 'active')
                     ORDER BY p.destacado DESC, p.nombre ASC`;
        }
        
        const [rows] = await connection.query(query, [req.params.categoryId]);
        const mappedRows = rows.map(row => mapProductColumns(row, tableName));
        
        res.json({ success: true, data: mappedRows });
    } catch (error) {
        console.error('❌ Error al obtener productos por categoría:', error);
        res.status(500).json({ success: false, error: error.message });
    } finally {
        if (connection) connection.release();
    }
});

// Obtener producto por SKU
router.get('/api/products/sku/:sku', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const tableName = await getProductsTable(connection);
        
        let query;
        if (tableName === 'products') {
            query = `SELECT p.id, p.sku, p.name, p.slug, p.description, p.price, 
                            p.price_promo, p.stock, p.image_url, p.is_top_seller, 
                            c.name as category 
                     FROM products p 
                     LEFT JOIN categories c ON p.category_id = c.id 
                     WHERE p.sku = ? AND p.status = 'active'`;
        } else {
            query = `SELECT p.id, p.sku, p.nombre as name, p.descripcion as description, 
                            p.precio as price, p.precio_promocion as price_promo, 
                            p.existencia as stock, p.imagen as image_url, 
                            p.destacado as is_top_seller, p.categoria as category 
                     FROM productos p 
                     WHERE p.sku = ? AND (p.estado = 'activo' OR p.estado = 'active')`;
        }
        
        const [rows] = await connection.query(query, [req.params.sku]);
        
        if (rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }
        
        const mapped = mapProductColumns(rows[0], tableName);
        res.json({ success: true, data: mapped });
    } catch (error) {
        console.error('❌ Error al obtener producto:', error);
        res.status(500).json({ success: false, error: error.message });
    } finally {
        if (connection) connection.release();
    }
});

module.exports = router;
