-- =========================================================
-- Love&Sex v3 - ACTUALIZACIÓN DE 9 CATEGORÍAS REALES
-- Generado: 01/01/2026
-- =========================================================

SET NAMES utf8mb4;

USE lovesex_v3;

-- Actualizar categorías existentes
TRUNCATE TABLE categories;

INSERT INTO categories (id, name, slug, description, status) VALUES
(1, 'Anillos y Fundas', 'anillos-y-fundas', 'Anillos penianos y fundas extensoras para potenciar el placer', 'active'),
(2, 'Arnés y Fetish', 'arnes-y-fetish', 'Accesorios BDSM, arneses y elementos fetichistas premium', 'active'),
(3, 'Cremas y Lubricantes', 'cremas-y-lubricantes', 'Lubricantes, cremas estimulantes y geles íntimos', 'active'),
(4, 'Masturbadores y Bombas', 'masturbadores-y-bombas', 'Masturbadores de alta calidad y bombas de vacío', 'active'),
(5, 'Retardantes', 'retardantes', 'Productos para prolongar y mejorar la duración', 'active'),
(6, 'Vibradores', 'vibradores', 'Vibradores recargables, silenciosos y de múltiples velocidades', 'active'),
(7, 'Vigorizantes Sexuales', 'vigorizantes-sexuales', 'Estimulantes y vigorizantes para aumentar el deseo', 'active'),
(8, 'Dildos', 'dildos', 'Dildos de diversos materiales, tamaños y formas', 'active'),
(9, 'Juguetes Anales', 'juguetes-anales', 'Juguetes especializados para estimulación anal segura', 'active');

-- Actualizar productos con IDs de categoría correctos
UPDATE products SET category_id = 8 WHERE categoria = 'DILDOS' OR category = 'DILDOS';
UPDATE products SET category_id = 9 WHERE categoria = 'JUGUETES ANALES' OR category = 'JUGUETES ANALES';
UPDATE products SET category_id = 6 WHERE categoria = 'VIBRADORES' OR category = 'VIBRADORES';
UPDATE products SET category_id = 7 WHERE categoria = 'ESTIMULANTES' OR category = 'ESTIMULANTES';

-- Nota: Para las nuevas categorías (1-5), será necesario importar más productos
-- o actualizar el inventario existente según corresponda.
