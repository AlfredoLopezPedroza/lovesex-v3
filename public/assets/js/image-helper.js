/**
 * =========================================================
 * NORMALIZACIÓN DE SKUS - Love&Sex V3
 * Helper para construir rutas de imágenes normalizadas
 * =========================================================
 */

/**
 * Construye la ruta de imagen basada en categoría y SKU
 * Los SKUs en la BD están en MAYÚSCULAS pero los archivos están en minúsculas
 * 
 * @param {string} categoryName - Nombre de la categoría (ej: "Vibradores")
 * @param {string} sku - SKU del producto (ej: "VV-APP")
 * @returns {string} Ruta completa de la imagen (ej: "/assets/img/products/vibradores/vv-app.jpg")
 */
function buildProductImagePath(categoryName, sku) {
    // Convertir nombre de categoría a slug (minúsculas, espacios a guiones)
    const categorySlug = categoryName
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[áéíóú]/g, char => ({
            'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u'
        })[char]);
    
    // Convertir SKU a minúsculas
    const skuLowerCase = sku.toLowerCase();
    
    // Construir ruta
    return `/assets/img/products/${categorySlug}/${skuLowerCase}.jpg`;
}

/**
 * Valida si la ruta de imagen existe
 * 
 * @param {string} imagePath - Ruta a validar
 * @returns {Promise<boolean>} true si existe, false si no
 */
async function imageExists(imagePath) {
    try {
        const response = await fetch(imagePath, { method: 'HEAD' });
        return response.ok;
    } catch {
        return false;
    }
}

/**
 * Obtiene la ruta correcta de imagen con fallback
 * 
 * @param {Object} product - Objeto del producto
 * @returns {Promise<string>} Ruta de imagen a usar
 */
async function getProductImageUrl(product) {
    const primaryPath = buildProductImagePath(product.category, product.sku);
    
    // Intentar con ruta primaria
    if (await imageExists(primaryPath)) {
        return primaryPath;
    }
    
    // Fallback a placeholder
    return `https://via.placeholder.com/300x300?text=${encodeURIComponent(product.name)}`;
}

/**
 * Ejemplos de uso:
 * 
 * // En renderProducts()
 * const imagePath = buildProductImagePath(product.category, product.sku);
 * 
 * Ejemplos:
 * buildProductImagePath('Vibradores', 'VV-APP')
 * → '/assets/img/products/vibradores/vv-app.jpg'
 * 
 * buildProductImagePath('Dildos', 'DP-CRISTAL3')
 * → '/assets/img/products/dildos/dp-cristal3.jpg'
 * 
 * buildProductImagePath('Cremas y Lubricantes', 'LUBRI-PRIME')
 * → '/assets/img/products/cremas-y-lubricantes/lubri-prime.jpg'
 */

// Exportar para uso en otros módulos (si es necesario)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        buildProductImagePath,
        imageExists,
        getProductImageUrl
    };
}
