# 🖼️ SISTEMA DE FALLBACK FLEXIBLE DE IMÁGENES

## Característica

El frontend automáticamente intenta cargar imágenes en múltiples formatos:
- Intenta primero: `.jpg`
- Si falla: intenta `.png`
- Si falla: intenta `.webp`
- Si falla: intenta `.jpeg`
- Si todas fallan: usa un **placeholder dinámico**

## Cómo Funciona

### 1. Función buildImagePath()

Construye la ruta base sin extensión:

```javascript
function buildImagePath(categorySlug, sku) {
    return `/assets/img/products/${categorySlug}/${sku}`;
}

// Ejemplo:
buildImagePath('vibradores', 'vv-app')
// → '/assets/img/products/vibradores/vv-app'
```

### 2. Función handleImageError()

Maneja el fallback cuando una imagen falla:

```javascript
function handleImageError(img, basePath, productName) {
    const formats = ['jpg', 'png', 'webp', 'jpeg'];
    // Intenta el siguiente formato
    // Si todos fallan, usa placeholder
}
```

### 3. Etiqueta img

```html
<img 
    src="${basePath}.jpg" 
    alt="Nombre del producto"
    onerror="handleImageError(this, '${basePath}', '${productName}')"
>
```

## Flujo de Carga

```
1. Intenta:  /assets/img/products/vibradores/vv-app.jpg
   ↓ (si falla)
   
2. Intenta:  /assets/img/products/vibradores/vv-app.png
   ↓ (si falla)
   
3. Intenta:  /assets/img/products/vibradores/vv-app.webp
   ↓ (si falla)
   
4. Intenta:  /assets/img/products/vibradores/vv-app.jpeg
   ↓ (si todo falla)
   
5. Usa placeholder:
   https://via.placeholder.com/300x300?text=VIBRADOR+APP+IOS
```

## Ventajas

✅ **Flexibilidad Total** - Sube cualquier formato que quieras
✅ **Sin Renombrar** - No importa si es .jpg, .png o .webp
✅ **Sin Actualizar BD** - El código maneja automáticamente
✅ **Fallback Inteligente** - Si no encuentra nada, muestra placeholder
✅ **Rendimiento** - Intenta formatos eficientes (jpg → png → webp)

## Ejemplos de Uso

### Caso 1: Solo JPG

Archivo: `/assets/img/products/vibradores/vv-app.jpg`

```
Intento 1: .jpg ✅ ENCONTRADO
Resultado: Carga el JPG
```

### Caso 2: Solo PNG

Archivo: `/assets/img/products/vibradores/vv-app.png`

```
Intento 1: .jpg ❌
Intento 2: .png ✅ ENCONTRADO
Resultado: Carga el PNG
```

### Caso 3: Mezcla

```
/assets/img/products/dildos/dp-cristal3.webp
/assets/img/products/cremas-y-lubricantes/lubri-prime.png
/assets/img/products/anillos-y-fundas/anillo-premium.jpg
```

El sistema intenta cada formato automáticamente para cada archivo.

### Caso 4: Archivo No Existe

```
Intento 1: .jpg ❌
Intento 2: .png ❌
Intento 3: .webp ❌
Intento 4: .jpeg ❌
Resultado: Muestra placeholder genérico
```

## Procedimiento de Carga

### Opción 1: Todos JPG (Recomendado)

```
Sube:
/assets/img/products/vibradores/vv-app.jpg
/assets/img/products/vibradores/vv-martillo.jpg
/assets/img/products/dildos/dp-cristal3.jpg
```

### Opción 2: Mezcla de Formatos

```
Sube:
/assets/img/products/vibradores/vv-app.png
/assets/img/products/vibradores/vv-martillo.webp
/assets/img/products/dildos/dp-cristal3.jpg
/assets/img/products/dildos/dp-strapon.jpeg
```

El sistema buscará automáticamente cada uno en orden.

### Opción 3: Optimización Web (WebP Primario)

```
Sube ambos:
/assets/img/products/vibradores/vv-app.webp  (Principal)
/assets/img/products/vibradores/vv-app.jpg   (Fallback)
```

El frontend intenta WebP primero (más eficiente), luego PNG, luego JPEG.

## Órdenes de Formato Recomendadas

### Por Rendimiento (Recomendado)
1. WebP (más comprimido)
2. PNG (transparencia)
3. JPG (universal)
4. JPEG (compatibilidad)

### Por Compatibilidad
1. JPG (máxima compatibilidad)
2. PNG (buenos para transparencia)
3. WebP (moderno, eficiente)
4. JPEG (universal)

### Mixto (Balanceado)
- JPG para fotos de productos
- PNG para gráficos con transparencia
- WebP para versiones optimizadas

## Archivos Relevantes

- `public/views/index.html` - Contiene `handleImageError()` y `buildImagePath()`
- `public/assets/js/image-helper.js` - Helper utilities opcionales

## Notas Técnicas

- Los SKUs siempre se convierten a minúsculas: `VV-APP` → `vv-app`
- Las categorías se convierten a slug: `Cremas y Lubricantes` → `cremas-y-lubricantes`
- El atributo `data-format-attempt` rastrea cuántos formatos se intentaron
- El placeholder usa URL encoding para nombres especiales

## Troubleshooting

### Problema: Imagen no carga
```
Solución:
1. Verifica que el archivo existe
2. Nombra con SKU en minúsculas
3. Intenta otro formato (.jpg, .png, .webp)
4. Si todo falla, usa placeholder
```

### Problema: Placeholder aparece siempre
```
Solución:
1. Verifica ruta de carpeta (slug debe ser correcto)
2. Revisa permisos del archivo (debe ser legible)
3. Intenta subir el archivo manualmente en phpMyAdmin
4. Limpia cache del navegador
```

### Problema: Quiero forzar cierto formato
```
Solución:
Solo sube ese formato. Si `vv-app.jpg` no existe,
el sistema intentará `vv-app.png`, etc.
```

---

**Generado:** 01/01/2026
**Sistema:** Love&Sex V3 - Image Fallback System
