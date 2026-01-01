-- =========================================================
-- Love&Sex v3 - MIGRACIÓN A ESTRUCTURA NORMALIZADA
-- Generado: 01/01/2026
-- Autor: IA-CRÓPOLIS Node.js Migration
-- =========================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- CREAR BASE DE DATOS
CREATE DATABASE IF NOT EXISTS lovesex_v3
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE lovesex_v3;

-- =========================================================
-- TABLA: categories
-- =========================================================
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image_url VARCHAR(255) DEFAULT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertar categorías extraídas del inventario
INSERT INTO categories (name, slug, description, status) VALUES
('DILDOS', 'dildos', 'Dildos y juguetes penetrantes de diversas formas y materiales', 'active'),
('JUGUETES ANALES', 'juguetes-anales', 'Juguetes diseñados para estimulación anal', 'active'),
('VIBRADORES', 'vibradores', 'Vibradores recargables y tradicionales', 'active'),
('ESTIMULANTES', 'estimulantes', 'Estimulantes y afrodisíacos de origen natural y químico', 'active');

-- =========================================================
-- TABLA: products
-- =========================================================
DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    sku VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category_id INT UNSIGNED NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    price_promo DECIMAL(10, 2) DEFAULT 0.00,
    stock INT DEFAULT 0,
    image_url VARCHAR(255) DEFAULT 'pendiente.jpg',
    is_top_seller TINYINT(1) DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertar productos migratos del inventario original
INSERT INTO products (sku, name, slug, category_id, description, price, price_promo, is_top_seller, status) VALUES

-- DILDOS (category_id = 1)
('DP-STRAPON', 'DILDO STRAP ON', 'dildo-strap-on-dp-strapon', 1, 'Material: TPE. Tamaño: 23.5 x 3.5 cm.', 400.00, 0.00, 0, 'active'),
('DP-CRISTAL3', 'DILDO JUMBO DE CRISTAL', 'dildo-jumbo-de-cristal-dp-cristal3', 1, 'Cristal grado quirúrgico. Resistente a temperaturas.', 750.00, 350.00, 1, 'active'),
('DP-VENOSONAC', 'DILDO VENOSO', 'dildo-venoso-dp-venosonac', 1, 'Grande, venoso, nacional. 29 cm x 4 cm.', 650.00, 0.00, 0, 'active'),

-- JUGUETES ANALES (category_id = 2)
('DP-GEMA', 'PLUG METÁLICO CON GEMA', 'plug-metalico-con-gema-dp-gema', 2, 'Metal grado quirúrgico. 7.0 cm x 2.3 cm.', 250.00, 0.00, 0, 'active'),
('DP-ANALRECARGABLE', 'ANAL RECARGABLE', 'anal-recargable-dp-analrecargable', 2, '10 modos de vibración. Control remoto.', 550.00, 0.00, 1, 'active'),

-- VIBRADORES (category_id = 3)
('VV-APP', 'VIBRADOR APP IOS', 'vibrador-con-aplicacion-para-ios-vv-app', 3, 'Silicona médica. Control bluetooth solo iOS.', 850.00, 0.00, 1, 'active'),
('VV-MARTILLO', 'VIBRADOR MARTILLO', 'vibrador-martillo-vv-martillo', 3, 'Silicona. 3 modos de vibración. Recargable.', 650.00, 0.00, 0, 'active'),

-- ESTIMULANTES (category_id = 4)
('PS-GOLD', 'RHINO GOLD', 'rhino-gold-ps-gold', 4, 'Afrodisíaco masculino individual. Cápsula oro/negro.', 250.00, 0.00, 1, 'active'),
('PS-IBIZAW', 'IBIZA WOMAN', 'ibiza-woman-ps-ibizaw', 4, 'Aumenta excitación e intensifica orgasmos.', 250.00, 0.00, 1, 'active');

-- =========================================================
-- TABLA: users (para administración)
-- =========================================================
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role ENUM('admin', 'customer') DEFAULT 'customer',
    status ENUM('active', 'inactive') DEFAULT 'active',
    last_login_at DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Usuario admin por defecto
INSERT INTO users (username, email, password_hash, full_name, role, status) VALUES
('admin', 'admin@lovesex.com', '$2y$10$V8ld9qVq6eA5HnF1ytYd0eCL8fRhx3KP3kzZz2L0uYqPUCujtYEq2', 'Administrador Love&Sex', 'admin', 'active');

-- =========================================================
-- TABLA: media (para imágenes y archivos)
-- =========================================================
DROP TABLE IF EXISTS media;

CREATE TABLE media (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_type VARCHAR(50),
    product_id INT UNSIGNED,
    file_size INT,
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- =========================================================
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_media_product ON media(product_id);

SET FOREIGN_KEY_CHECKS = 1;

-- =========================================================
-- VERIFICACIÓN FINAL
-- =========================================================
-- SELECT 'Categories' as table_name, COUNT(*) as total FROM categories
-- UNION ALL
-- SELECT 'Products', COUNT(*) FROM products
-- UNION ALL
-- SELECT 'Users', COUNT(*) FROM users;
