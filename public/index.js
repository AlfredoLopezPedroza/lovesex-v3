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

// Obtener todos los productos
app.get('/api/products', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT id, name, price, category_id, image_url, status FROM products WHERE status = "active"');
        connection.release();
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error('❌ Error al obtener productos:', error);
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
