const pool = require('../core/db');

// Helper to detect table name
async function getProductsTable(connection) {
    try {
        await connection.query('SELECT 1 FROM products LIMIT 1');
        return 'products';
    } catch {
        try {
            await connection.query('SELECT 1 FROM productos LIMIT 1');
            return 'productos';
        } catch {
            throw new Error('No se encontró tabla de productos (products o productos)');
        }
    }
}

// Helper to map columns
function mapProductColumns(row, tableName) {
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

const Product = {
    findAll: async () => {
        const connection = await pool.getConnection();
        try {
            const tableName = await getProductsTable(connection);
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
            return rows.map(row => mapProductColumns(row, tableName));
        } finally {
            connection.release();
        }
    },

    findByCategory: async (categoryId) => {
        const connection = await pool.getConnection();
        try {
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
            const [rows] = await connection.query(query, [categoryId]);
            return rows.map(row => mapProductColumns(row, tableName));
        } finally {
            connection.release();
        }
    },

    findBySku: async (sku) => {
        const connection = await pool.getConnection();
        try {
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
            const [rows] = await connection.query(query, [sku]);
            if (rows.length === 0) return null;
            return mapProductColumns(rows[0], tableName);
        } finally {
            connection.release();
        }
    }
};

module.exports = Product;
