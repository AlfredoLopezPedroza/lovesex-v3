require('dotenv').config();

const config = {
    db: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'lovesex_v3',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    },
    server: {
        port: process.env.PORT || 3000
    }
};

module.exports = config;
