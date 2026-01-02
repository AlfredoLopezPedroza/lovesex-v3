const pool = require('../core/db');

const Media = {
    findAll: async () => {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT id, filename, file_path, file_type, uploaded_at FROM media');
            return rows;
        } finally {
            connection.release();
        }
    }
};

module.exports = Media;
