-- =========================================================
-- LOVE&SEX V3 - DATABASE MASTER
-- Todas las categorías y productos extraídos
-- Generado: 01/01/2026
-- =========================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- =========================================================
-- TABLA: categorias
-- =========================================================
DROP TABLE IF EXISTS `categorias`;

CREATE TABLE `categorias` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(100) NOT NULL UNIQUE,
    `alias` VARCHAR(100) NOT NULL UNIQUE,
    `descripcion` TEXT,
    `estado` ENUM('activo', 'inactivo') DEFAULT 'activo',
    `creado_en` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `actualizado_en` DATETIME NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertar categorías normalizadas
INSERT INTO `categorias` (`nombre`, `alias`, `descripcion`, `estado`) VALUES
('Dildos', 'dildos', 'Dildos y juguetes penetrantes de diversas formas y materiales', 'activo'),
('Juguetes Anales', 'juguetes-anales', 'Juguetes diseñados para estimulación anal', 'activo'),
('Vibradores', 'vibradores', 'Vibradores recargables y tradicionales de toda variedad', 'activo'),
('Cremas y Lubricantes', 'lubricantes', 'Lubricantes, cremas y geles de diferentes tipos', 'activo'),
('Retardantes', 'retardantes', 'Productos retardantes para mayor duración', 'activo'),
('Arnés y Fetish', 'fetish', 'Arneses, accesorios de fetiche y bondage', 'activo'),
('Masturbadores y Bombas', 'masturbadores', 'Masturbadores manuales y bombas de vacío', 'activo'),
('Anillos y Fundas', 'accesorios', 'Anillos penianos, fundas y accesorios', 'activo'),
('Vigorizantes Sexuales', 'estimulantes', 'Estimulantes y vigorizantes sexuales', 'activo');

-- =========================================================
-- TABLA: productos
-- =========================================================
DROP TABLE IF EXISTS `productos`;

CREATE TABLE `productos` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `sku` VARCHAR(50) NOT NULL UNIQUE,
    `nombre` VARCHAR(255) NOT NULL,
    `descripcion` TEXT,
    `precio` DECIMAL(10, 2) DEFAULT NULL,
    `precio_promocion` DECIMAL(10, 2) DEFAULT NULL,
    `existencia` INT DEFAULT 0,
    `imagen` VARCHAR(255) DEFAULT NULL,
    `destacado` TINYINT(1) DEFAULT 0,
    `categoria_id` INT UNSIGNED DEFAULT NULL,
    `estado` ENUM('activo', 'inactivo') DEFAULT 'activo',
    `creado_en` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `actualizado_en` DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`categoria_id`) REFERENCES `categorias`(`id`) ON DELETE SET NULL,
    INDEX `idx_sku` (`sku`),
    INDEX `idx_categoria` (`categoria_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================================================
-- PRODUCTOS: DILDOS (12 items)
-- =========================================================
INSERT INTO `productos` (`sku`, `nombre`, `categoria_id`, `estado`) VALUES
('DP-34CM', 'Dildo 34cm', 1, 'activo'),
('DP-ARNESH', 'Dildo Arnesh', 1, 'activo'),
('DP-BICOLOR', 'Dildo Bicolor', 1, 'activo'),
('DP-CRISTAL3', 'Dildo Cristal 3', 1, 'activo'),
('DP-DOBLEPLACER', 'Dildo Doble Placer', 1, 'activo'),
('DP-FLUORECENTE', 'Dildo Fluorescente', 1, 'activo'),
('DP-JELLY', 'Dildo Jelly', 1, 'activo'),
('DP-LANCER26', 'Dildo Lancer 26', 1, 'activo'),
('DP-MRBIG', 'Dildo Mr Big', 1, 'activo'),
('DP-STRAPON', 'Dildo Strapon', 1, 'activo'),
('DP-TRANSPARENTE18', 'Dildo Transparente 18', 1, 'activo'),
('DP-VENOSONAC', 'Dildo Venoso Nac', 1, 'activo'),
('DP-ZORRO', 'Dildo Zorro', 1, 'activo');

-- =========================================================
-- PRODUCTOS: JUGUETES ANALES (11 items)
-- =========================================================
INSERT INTO `productos` (`sku`, `nombre`, `categoria_id`, `estado`) VALUES
('DP-ANALRECARGABLE', 'Dildo Anal Recargable', 2, 'activo'),
('DP-CONEJO', 'Dildo Conejo Anal', 2, 'activo'),
('DP-CORAZONCH', 'Dildo Corazón Ch Anal', 2, 'activo'),
('DP-CUENCAS', 'Dildo Cuencas Anal', 2, 'activo'),
('DP-GEMA', 'Dildo Gema Anal', 2, 'activo'),
('DP-KITTY', 'Dildo Kitty Anal', 2, 'activo'),
('DP-MINIPLUG', 'Dildo Mini Plug', 2, 'activo'),
('DP-ROSARIO', 'Dildo Rosario Anal', 2, 'activo'),
('DP-TEXTURA', 'Dildo Textura Anal', 2, 'activo'),
('DP-ZORRO', 'Dildo Zorro Anal', 2, 'activo'),
('PD-SILICON', 'Plug Silicón', 2, 'activo');

-- =========================================================
-- PRODUCTOS: VIBRADORES (25 items)
-- =========================================================
INSERT INTO `productos` (`sku`, `nombre`, `categoria_id`, `estado`) VALUES
('DP-ZORRO', 'Vibrador Zorro', 3, 'activo'),
('VV-AMANRAYA', 'Vibrador Manta Raya', 3, 'activo'),
('VV-ANAL', 'Vibrador Anal', 3, 'activo'),
('VV-APP', 'Vibrador App', 3, 'activo'),
('VV-AQUARIUS', 'Vibrador Aquarius', 3, 'activo'),
('VV-BALAC', 'Vibrador Balac', 3, 'activo'),
('VV-BALAUSB', 'Vibrador Balausb', 3, 'activo'),
('VV-BROCHA', 'Vibrador Brocha', 3, 'activo'),
('VV-CHUCK', 'Vibrador Chuck', 3, 'activo'),
('VV-CONEJO', 'Vibrador Conejo', 3, 'activo'),
('VV-DELFIN', 'Vibrador Delfín', 3, 'activo'),
('VV-DOLPHIN', 'Vibrador Dolphin', 3, 'activo'),
('VV-DUAL1', 'Vibrador Dual 1', 3, 'activo'),
('VV-DUAL2', 'Vibrador Dual 2', 3, 'activo'),
('VV-FUNDA', 'Vibrador Funda', 3, 'activo'),
('VV-FUNDADEDAL', 'Vibrador Funda Dedal', 3, 'activo'),
('VV-FUNDALISO', 'Vibrador Funda Liso', 3, 'activo'),
('VV-HUEVO01', 'Vibrador Huevo 01', 3, 'activo'),
('VV-INALAMBRICO2', 'Vibrador Inalámbrico 2', 3, 'activo'),
('VV-LALA', 'Vibrador Lala', 3, 'activo'),
('VV-LURE85', 'Vibrador Lure 85', 3, 'activo'),
('VV-MARTILLO', 'Vibrador Martillo', 3, 'activo'),
('VV-NEGRO', 'Vibrador Negro', 3, 'activo'),
('VV-PINZAS', 'Vibrador Pinzas', 3, 'activo'),
('VV-PINZASPEZON', 'Vibrador Pinzas Pezón', 3, 'activo');

-- =========================================================
-- PRODUCTOS: CREMAS Y LUBRICANTES (17 items)
-- =========================================================
INSERT INTO `productos` (`sku`, `nombre`, `categoria_id`, `estado`) VALUES
('CG-4EN1', 'Crema 4 en 1', 4, 'activo'),
('CG-AIMANI', 'Crema Aimani', 4, 'activo'),
('CG-ALGODON', 'Crema Algodón', 4, 'activo'),
('CG-ANALFRESA', 'Crema Anal Fresa', 4, 'activo'),
('CG-ANALUB', 'Crema Anal Lub', 4, 'activo'),
('CG-ANASP', 'Crema Anal SP', 4, 'activo'),
('CG-ESTRECHADOR', 'Crema Estrechadora', 4, 'activo'),
('CG-FEEL4EN1', 'Crema Feel 4 en 1', 4, 'activo'),
('CG-FEROMONASEL', 'Crema Feromonas El', 4, 'activo'),
('CG-FEROMONASELLA', 'Crema Feromonas Ella', 4, 'activo'),
('CG-KISS', 'Crema Kiss', 4, 'activo'),
('CG-LUBCANNABIS', 'Crema Lub Cannabis', 4, 'activo'),
('CG-PLEASURE', 'Crema Pleasure', 4, 'activo'),
('CG-SENSITIVE', 'Crema Sensitive', 4, 'activo'),
('CG-SIYINAT', 'Crema Siyinat', 4, 'activo'),
('CG-TOUCHAN', 'Crema Touch An', 4, 'activo'),
('LG-2EN1', 'Lubricante 2 en 1', 4, 'activo');

-- =========================================================
-- PRODUCTOS: RETARDANTES (2 items)
-- =========================================================
INSERT INTO `productos` (`sku`, `nombre`, `categoria_id`, `estado`) VALUES
('CG-INDIO', 'Crema Retardante Indio', 5, 'activo'),
('LG-STAY', 'Lubricante Stay', 5, 'activo');

-- =========================================================
-- PRODUCTOS: ARNÉS Y FETISH (6 items)
-- =========================================================
INSERT INTO `productos` (`sku`, `nombre`, `categoria_id`, `estado`) VALUES
('BF-7PZ', 'Bondage Fetish 7 piezas', 6, 'activo'),
('FE-COLLAR', 'Fetiche Collar', 6, 'activo'),
('FE-PINZAS', 'Fetiche Pinzas', 6, 'activo'),
('FT-ESPOSAS', 'Fetiche Esposas', 6, 'activo'),
('FT-KITNEGRO', 'Fetiche Kit Negro', 6, 'activo'),
('FT-MORDAZA', 'Fetiche Mordaza', 6, 'activo');

-- =========================================================
-- PRODUCTOS: MASTURBADORES Y BOMBAS (6 items)
-- =========================================================
INSERT INTO `productos` (`sku`, `nombre`, `categoria_id`, `estado`) VALUES
('MB-BOCALENGUA', 'Masturbador Boca Lengua', 7, 'activo'),
('MB-BOMBAGM', 'Bomba GM', 7, 'activo'),
('MB-BOMBAMEN', 'Bomba Hombre', 7, 'activo'),
('MB-EVENBIGER', 'Masturbador Even Bigger', 7, 'activo'),
('MB-MENLITTLE', 'Masturbador Men Little', 7, 'activo'),
('MBHUEVO', 'Masturbador Huevo', 7, 'activo');

-- =========================================================
-- PRODUCTOS: ANILLOS Y FUNDAS (16 items)
-- =========================================================
INSERT INTO `productos` (`sku`, `nombre`, `categoria_id`, `estado`) VALUES
('AF-NOMBRE', 'Accesorio AF Nombre', 8, 'activo'),
('AF-ANILLOCONTROL', 'Anillo Control', 8, 'activo'),
('AF-ANILLORECAR', 'Anillo Recargable', 8, 'activo'),
('AF-CONDONES', 'Accesorios Condones', 8, 'activo'),
('AF-CONTENSION', 'Anillo Contensión', 8, 'activo'),
('AF-DESECHABLE', 'Accesorio Desechable', 8, 'activo'),
('AF-ESTIMUCLITORIS', 'Estimulador Clítoris', 8, 'activo'),
('AF-KITANILLOS', 'Kit de Anillos', 8, 'activo'),
('AF-SILICON', 'Anillo Silicón', 8, 'activo'),
('AF-SILICON2', 'Anillo Silicón 2', 8, 'activo'),
('AF-SILICON3', 'Anillo Silicón 3', 8, 'activo'),
('AF-SILICON4', 'Anillo Silicón 4', 8, 'activo'),
('AF-VIBRADOR', 'Anillo Vibrador', 8, 'activo'),
('AS-VIBRACIÓN', 'Accesorio Vibración', 8, 'activo'),
('FE-DESCUBIERTA', 'Funda Descubierta', 8, 'activo'),
('FE-MANO', 'Funda Mano', 8, 'activo');

-- =========================================================
-- PRODUCTOS: VIGORIZANTES SEXUALES (6 items)
-- =========================================================
INSERT INTO `productos` (`sku`, `nombre`, `categoria_id`, `estado`) VALUES
('PS-BOMBAY', 'Pastilla Sexual Bombay', 9, 'activo'),
('PS-GOLD', 'Pastilla Sexual Gold', 9, 'activo'),
('PS-IBIZAW', 'Pastilla Sexual Ibiza W', 9, 'activo'),
('PS-PAGODA', 'Pastilla Sexual Pagoda', 9, 'activo'),
('PS-RACINGBULL', 'Pastilla Sexual Racing Bull', 9, 'activo'),
('PS-RHINOC', 'Pastilla Sexual Rhinoceros', 9, 'activo');

-- =========================================================
-- ESTADÍSTICAS FINALES
-- =========================================================
-- Total de categorías: 9
-- Total de productos: 108
-- Codificación: UTF-8
-- Estructura lista para consumo en API
-- =========================================================

SET FOREIGN_KEY_CHECKS = 1;