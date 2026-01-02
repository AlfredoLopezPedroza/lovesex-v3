const pool = require('../core/db');

const Category = {
    findAllActive: async () => {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT id, name, description, status FROM categories WHERE status = "active"');
            return rows;
        } finally {
            connection.release();
        }
    }
};

module.exports = Category;
