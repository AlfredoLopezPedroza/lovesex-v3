# 🔤 NORMALIZACIÓN DE SKUS - Love&Sex V3

## Problema Original

- **BD:** SKUs almacenados en MAYÚSCULAS (ej: `VV-APP`, `DP-CRISTAL3`)
- **Archivos:** Imágenes en minúsculas (ej: `vv-app.jpg`, `dp-cristal3.jpg`)
- **Solución:** Aplicar `.toLowerCase()` cuando se construyen rutas de imágenes

## Implementación

### Frontend (public/views/index.html)

En ambas funciones de renderizado (`renderProducts` y `renderFeaturedProducts`), la ruta se construye así:

```javascript
const imagePath = `/assets/img/products/${categorySlug}/${product.sku.toLowerCase()}.jpg`;
```

### Ejemplo Práctico

**BD:**
```javascript
{
    sku: "VV-APP",
    name: "VIBRADOR APP IOS",
    category: "Vibradores"
}
```

**Construcción de ruta:**
```javascript
categorySlug = "Vibradores".toLowerCase().replace(/\s+/g, '-')  // "vibradores"
skuLowerCase = "VV-APP".toLowerCase()                           // "vv-app"
imagePath = `/assets/img/products/vibradores/vv-app.jpg`        // Resultado final
```

**Archivo esperado:**
```
/assets/img/products/vibradores/vv-app.jpg
```

## Casos de Uso

| SKU en BD | Nombre Archivo | Ruta Generada |
|-----------|---|---|
| `VV-APP` | `vv-app.jpg` | `/assets/img/products/vibradores/vv-app.jpg` |
| `DP-CRISTAL3` | `dp-cristal3.jpg` | `/assets/img/products/dildos/dp-cristal3.jpg` |
| `PS-GOLD` | `ps-gold.jpg` | `/assets/img/products/vigorizantes-sexuales/ps-gold.jpg` |
| `DP-STRAPON` | `dp-strapon.jpg` | `/assets/img/products/dildos/dp-strapon.jpg` |
| `LUBRI-PRIME` | `lubri-prime.jpg` | `/assets/img/products/cremas-y-lubricantes/lubri-prime.jpg` |

## Función Helper (Opcional)

Se proporciona `public/assets/js/image-helper.js` con la función:

```javascript
function buildProductImagePath(categoryName, sku) {
    const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-');
    const skuLowerCase = sku.toLowerCase();
    return `/assets/img/products/${categorySlug}/${skuLowerCase}.jpg`;
}
```

Uso:
```javascript
const ruta = buildProductImagePath('Vibradores', 'VV-APP');
// Resultado: '/assets/img/products/vibradores/vv-app.jpg'
```

## Fallback Automático

Si la imagen no se encuentra, el código automáticamente usa un placeholder:

```javascript
onerror="this.src='https://via.placeholder.com/300x300?text=NOMBRE_PRODUCTO'"
```

Esto permite trabajar sin todas las imágenes cargadas.

## Cambios Realizados

✅ **renderProducts()** - Usa `.toLowerCase()` en SKU
✅ **renderFeaturedProducts()** - Usa `.toLowerCase()` en SKU
✅ **Nombramiento consistente** - Todos los archivos en minúsculas
✅ **Sin necesidad de renombrar** - Los archivos existentes funcionarán

## Procedimiento

### No Necesitas:
- ❌ Renombrar archivos manualmente
- ❌ Actualizar la BD
- ❌ Cambiar la estructura de carpetas

### Solo Necesitas:
- ✅ Cargar archivos con SKU en minúsculas
- ✅ En la carpeta correcta de categoría
- ✅ Con extensión `.jpg`

## Ejemplo Correcto

**Archivo a subir:**
```
Nombre: vv-app.jpg
Ruta: /assets/img/products/vibradores/vv-app.jpg
```

**El frontend automáticamente lo encontrará:**
```javascript
// Producto en BD
{ sku: "VV-APP", category: "Vibradores" }

// Frontend genera
/assets/img/products/vibradores/vv-app.jpg ✅
```

---

**Generado:** 01/01/2026
**Sistema:** Love&Sex V3 - SKU Normalization
