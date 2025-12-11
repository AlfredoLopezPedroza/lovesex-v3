-- =========================================================
-- Love&Sex v3 - Esquema de Base de Datos
-- =========================================================
-- Este script crea la BD, tablas y algunos datos de ejemplo.
-- Usuario admin por defecto:
--   user: admin
--   pass: admin123
-- =========================================================

-- Crea la base de datos (ajusta el nombre si quieres)
CREATE DATABASE IF NOT EXISTS lovesex_v3
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE lovesex_v3;

-- =========================================================
-- Tabla: users
-- =========================================================
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username       VARCHAR(50)  NOT NULL UNIQUE,
    email          VARCHAR(100) NOT NULL UNIQUE,
    password_hash  VARCHAR(255) NOT NULL,
    full_name      VARCHAR(100) NULL,
    role           ENUM('admin','customer') NOT NULL DEFAULT 'admin',
    status         ENUM('active','inactive') NOT NULL DEFAULT 'active',
    last_login_at  DATETIME NULL,
    created_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     DATETIME NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Usuario admin de prueba (pass: admin123)
INSERT INTO users (username, email, password_hash, full_name, role, status)
VALUES (
    'admin',
    'admin@lovesex.com',
    -- hash bcrypt de "admin123"
    '$2y$10$V8ld9qVq6eA5HnF1ytYd0eCL8fRhx3KP3kzZz2L0uYqPUCujtYEq2',
    'Administrador Love&Sex',
    'admin',
    'active'
)
ON DUPLICATE KEY UPDATE email = VALUES(email);

-- =========================================================
-- Tabla: categories
-- =========================================================
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    slug        VARCHAR(120) NOT NULL UNIQUE,
    description TEXT NULL,
    icon        VARCHAR(50) NULL,
    status      ENUM('active','inactive') NOT NULL DEFAULT 'active',
    display_order INT NOT NULL DEFAULT 0,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Categorías de ejemplo
INSERT INTO categories (name, slug, description, icon, display_order) VALUES
('Juguetes para Ella', 'juguetes-para-ella', 'Vibradores, balas, estimuladores y más', '♀', 1),
('Juguetes para Él', 'juguetes-para-el', 'Masturbadores, anillos, bombas y más', '♂', 2),
('Parejas', 'parejas', 'Juguetes para disfrutar en pareja', '❤', 3),
('Bondage & BDSM', 'bondage-bdsm', 'Esposas, látigos, cuerdas y accesorios', '⛓', 4),
('Lubricantes & Sensuales', 'lubricantes-sensuales', 'Lubricantes, aceites y más', '💧', 5)
ON DUPLICATE KEY UPDATE description = VALUES(description);

-- =========================================================
-- Tabla: products
-- =========================================================
DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category_id       INT UNSIGNED NOT NULL,
    name              VARCHAR(150) NOT NULL,
    slug              VARCHAR(180) NOT NULL UNIQUE,
    short_description VARCHAR(255) NULL,
    description       TEXT NULL,
    sku               VARCHAR(50) NULL,
    price             DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    compare_price     DECIMAL(10,2) NULL,
    stock             INT NOT NULL DEFAULT 0,
    min_stock         INT NOT NULL DEFAULT 5,
    featured          TINYINT(1) NOT NULL DEFAULT 0,
    rating            DECIMAL(3,2) NOT NULL DEFAULT 4.50,
    views             INT UNSIGNED NOT NULL DEFAULT 0,
    sales_count       INT UNSIGNED NOT NULL DEFAULT 0,
    status            ENUM('active','inactive') NOT NULL DEFAULT 'active',
    created_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_products_category
        FOREIGN KEY (category_id) REFERENCES categories(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    INDEX idx_products_category (category_id),
    INDEX idx_products_status (status),
    INDEX idx_products_featured (featured),
    INDEX idx_products_sales (sales_count),
    INDEX idx_products_views (views)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Productos de ejemplo
INSERT INTO products (
    category_id, name, slug,
    short_description, description,
    sku, price, compare_price,
    stock, min_stock, featured, rating, views, sales_count, status
)
VALUES
(
    1,
    'Vibrador Clitorial Premium',
    'vibrador-clitorial-premium',
    'Estimulación intensa y silenciosa',
    'Vibrador premium de silicón grado médico, resistente al agua y con múltiples modos de vibración.',
    'VIB-001',
    899.00,
    1099.00,
    15,
    5,
    1,
    4.8,
    120,
    35,
    'active'
),
(
    3,
    'Anillo Vibrador para Parejas',
    'anillo-vibrador-parejas',
    'Perfecto para disfrutar en pareja',
    'Anillo vibrador recargable, diseñado para estimular a ambos durante la relación sexual.',
    'ANI-010',
    499.00,
    NULL,
    25,
    5,
    1,
    4.7,
    90,
    50,
    'active'
)
ON DUPLICATE KEY UPDATE
    price        = VALUES(price),
    compare_price= VALUES(compare_price),
    stock        = VALUES(stock),
    status       = VALUES(status);

-- =========================================================
-- Tabla: product_media
-- =========================================================
DROP TABLE IF EXISTS product_media;

CREATE TABLE product_media (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    product_id     INT UNSIGNED NOT NULL,
    media_type     ENUM('image','video') NOT NULL DEFAULT 'image',
    file_path      VARCHAR(255) NOT NULL,
    thumbnail_path VARCHAR(255) NULL,
    alt_text       VARCHAR(150) NULL,
    is_primary     TINYINT(1) NOT NULL DEFAULT 0,
    display_order  INT NOT NULL DEFAULT 0,
    created_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_media_product
        FOREIGN KEY (product_id) REFERENCES products(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    INDEX idx_product_media_product (product_id),
    INDEX idx_product_media_primary (product_id, is_primary)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Media de ejemplo: se inserta sólo si el producto existe
INSERT INTO product_media (product_id, media_type, file_path, alt_text, is_primary, display_order)
SELECT p.id, 'image', 'uploads/vibrador-clitorial-premium-1.jpg',
       'Vibrador clitorial premium - vista principal', 1, 1
FROM products p
WHERE p.slug = 'vibrador-clitorial-premium'
ON DUPLICATE KEY UPDATE
    file_path = VALUES(file_path);

INSERT INTO product_media (product_id, media_type, file_path, alt_text, is_primary, display_order)
SELECT p.id, 'image', 'uploads/anillo-vibrador-parejas-1.jpg',
       'Anillo vibrador para parejas - vista principal', 1, 1
FROM products p
WHERE p.slug = 'anillo-vibrador-parejas'
ON DUPLICATE KEY UPDATE
    file_path = VALUES(file_path);

-- =========================================================
-- Tabla: orders
-- (para estadísticas en el dashboard de admin)
-- =========================================================
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_code    VARCHAR(20) NOT NULL UNIQUE,
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(100) NULL,
    total         DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    order_status  ENUM('pending','processing','delivered','cancelled') NOT NULL DEFAULT 'pending',
    created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_orders_status (order_status),
    INDEX idx_orders_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE order_items (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id     INT UNSIGNED NOT NULL,
    product_id   INT UNSIGNED NOT NULL,
    product_name VARCHAR(150) NOT NULL,
    quantity     INT NOT NULL DEFAULT 1,
    price        DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_order_items_order
        FOREIGN KEY (order_id) REFERENCES orders(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_order_items_product
        FOREIGN KEY (product_id) REFERENCES products(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    INDEX idx_order_items_order (order_id),
    INDEX idx_order_items_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================================================
-- Datos de ejemplo en órdenes (opcional, para ver stats)
-- =========================================================
INSERT INTO orders (order_code, customer_name, customer_phone, customer_email, total, order_status)
VALUES
('LSX-0001', 'Cliente Demo', '5217770000000', 'demo@correo.com', 1398.00, 'delivered'),
('LSX-0002', 'Cliente Prueba', '5217770000001', 'prueba@correo.com', 899.00, 'pending')
ON DUPLICATE KEY UPDATE
    total = VALUES(total),
    order_status = VALUES(order_status);

INSERT INTO order_items (order_id, product_id, product_name, quantity, price)
SELECT o.id, p.id, p.name, 1, p.price
FROM orders o
JOIN products p ON p.slug = 'vibrador-clitorial-premium'
WHERE o.order_code = 'LSX-0001'
LIMIT 1;