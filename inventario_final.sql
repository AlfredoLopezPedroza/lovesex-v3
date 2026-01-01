-- IA-CRÓPOLIS: CARGA MASIVA DE INVENTARIO SOBERANO
-- OPTIMIZADO PARA NODE.JS + MYSQL 8.0

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. LIMPIEZA PREVIA (Para evitar duplicados)
DROP TABLE IF EXISTS `productos`;

-- 2. CREACIÓN DE TABLA CON TIPOS DE DATOS PROFESIONALES
CREATE TABLE `productos` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `sku` VARCHAR(50) NOT NULL UNIQUE,
  `nombre` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `categoria` VARCHAR(100),
  `descripcion` TEXT,
  `precio` DECIMAL(10, 2) NOT NULL,
  `precio_promo` DECIMAL(10, 2) DEFAULT 0.00,
  `stock` INT DEFAULT 0,
  `imagen_principal` VARCHAR(255) DEFAULT 'pendiente.jpg',
  `top_ventas` TINYINT(1) DEFAULT 0,
  `fecha_creacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. INSERCIÓN DE PRODUCTOS (Muestra del bloque total)
INSERT INTO `productos` (`sku`, `nombre`, `slug`, `categoria`, `descripcion`, `precio`, `precio_promo`, `top_ventas`) 
VALUES 
-- DILDOS
('DP-STRAPON', 'DILDO STRAP ON', 'dildo-strap-on-dp-strapon', 'DILDOS', 'Material: TPE. Tamaño: 23.5 x 3.5 cm.', 400.00, 0.00, 0),
('DP-CRISTAL3', 'DILDO JUMBO DE CRISTAL', 'dildo-jumbo-de-cristal-dp-cristal3', 'DILDOS', 'Cristal grado quirúrgico. Resistente a temperaturas.', 750.00, 350.00, 1),
('DP-VENOSONAC', 'DILDO VENOSO', 'dildo-venoso-dp-venosonac', 'DILDOS', 'Grande, venoso, nacional. 29 cm x 4 cm.', 650.00, 0.00, 0),

-- JUGUETES ANALES
('DP-GEMA', 'PLUG METÁLICO CON GEMA', 'plug-metalico-con-gema-dp-gema', 'JUGUETES ANALES', 'Metal grado quirúrgico. 7.0 cm x 2.3 cm.', 250.00, 0.00, 0),
('DP-ANALRECARGABLE', 'ANAL RECARGABLE', 'anal-recargable-dp-analrecargable', 'JUGUETES ANALES', '10 modos de vibración. Control remoto.', 550.00, 0.00, 1),

-- VIBRADORES
('VV-APP', 'VIBRADOR APP IOS', 'vibrador-con-aplicacion-para-ios-vv-app', 'VIBRADORES', 'Silicona médica. Control bluetooth solo iOS.', 850.00, 0.00, 1),
('VV-MARTILLO', 'VIBRADOR MARTILLO', 'vibrador-martillo-vv-martillo', 'VIBRADORES', 'Silicona. 3 modos de vibración. Recargable.', 650.00, 0.00, 0),

-- ESTIMULANTES
('PS-GOLD', 'RHINO GOLD', 'rhino-gold-ps-gold', 'ESTIMULANTES', 'Afrodisíaco masculino individual. Cápsula oro/negro.', 250.00, 0.00, 1),
('PS-IBIZAW', 'IBIZA WOMAN', 'ibiza-woman-ps-ibizaw', 'ESTIMULANTES', 'Aumenta excitación e intensifica orgasmos.', 250.00, 0.00, 1);

-- [Aquí sigue el resto de los 100+ productos procesados]
SET FOREIGN_KEY_CHECKS = 1;