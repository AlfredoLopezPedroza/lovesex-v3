require('dotenv').config();
const express = require('express');
const path = require('path');
const pool = require('../core/db');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de archivos estáticos (Imágenes, CSS, JS front-end)
app.use(express.static(path.join(__dirname)));

// Middleware para procesar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta base
app.get('/', (req, res) => {
    res.send('🏛️ Love&Sex v3: Servidor Node.js Activo y Conectado');
});

// =========== RUTAS DE LECTURA DE DATOS ===========

// Obtener todos los usuarios
app.get('/api/users', async (req, res) => {
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
app.get('/api/categories', async (req, res) => {
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
app.get('/api/products', async (req, res) => {
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
app.get('/api/products/category/:categoryId', async (req, res) => {
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
app.get('/api/products/sku/:sku', async (req, res) => {
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

// Obtener inventario (media/archivos)
app.get('/api/media', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT id, filename, file_path, file_type, uploaded_at FROM media');
        connection.release();
        res.json({ success: true, data: rows });
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

app.listen(PORT, () => {
    console.log(`🚀 Servidor Node.js escuchando en el puerto ${PORT}`);
    console.log(`📊 API disponible en http://localhost:${PORT}/api/*`);
    console.log(`💓 Love&Sex v3 listo para recibir datos`);
});
