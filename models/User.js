const pool = require('../core/db');

const User = {
    findAll: async () => {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT id, username, email, full_name, role, status, created_at FROM users');
            return rows;
        } finally {
            connection.release();
        }
    }
};

module.exports = User;
